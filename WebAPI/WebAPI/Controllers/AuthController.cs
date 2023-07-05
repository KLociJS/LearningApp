using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using User.Management.Service.Models;
using User.Management.Service.Services;
using WebAPI.Models;
using WebAPI.Models.AuthModel;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        
        public AuthController(UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager,IEmailService emailService, IConfiguration configuration, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterUser registerUser)
        {
            try
            {
                // Check user exists
                var user = await _userManager.FindByEmailAsync(registerUser.Email);
                if (user != null)
                {
                    return Conflict(new { Message = "Email already in use."});
                }
            
                // If user doesnt exists
                AppUser newUser = new()
                {
                    Email = registerUser.Email,
                    UserName = registerUser.UserName,
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                var result = await _userManager.CreateAsync(newUser, registerUser.Password);
                // Assign role

                if (!result.Succeeded) return StatusCode(500, result.Errors);
                await _userManager.AddToRoleAsync(newUser, "User");
                
                //Add token to verify email
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                var confirmationLink = Url.Action(nameof(ConfirmEmail),"Auth", new {token, email=newUser.Email }, Request.Scheme);
                var message = new Message(new string[] { newUser.Email! }, "Email validation", confirmationLink!);
                _emailService.SendEmail(message);

                return Ok(new { Message = "User successfully created."});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return Ok("Email verified successfully!");
                }
            }
            return BadRequest("Unable to verify email!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            // find user
            var user = await _userManager.FindByNameAsync(loginUser.UserName);
            
            // validate password
            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                //create claims
                var authClaims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                
                //add user claims
                var userRoles = await _userManager.GetRolesAsync(user);
                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));
                
                //create token
                var jwtToken = GetToken(authClaims);

                
                return Ok(new
                {
                    expiration = jwtToken.ValidTo, 
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken)
                });
            }

            return Unauthorized();
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience:_configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims:authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}
