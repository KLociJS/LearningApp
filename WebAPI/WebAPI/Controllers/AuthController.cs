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
using WebAPI.Models.UserModels;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        
        public AuthController(
            UserManager<AppUser> userManager, 
            RoleManager<IdentityRole<Guid>> roleManager
            ,IEmailService emailService,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterUser registerUser)
        {
            try
            {
                // Check user exists
                var userNameExists = await _userManager.FindByNameAsync(registerUser.UserName);
                if (userNameExists != null)
                {
                    return Conflict(new List<object>() {new { Type="UserName", Description = "Username already in use."}});
                }
                
                var userExists = await _userManager.FindByEmailAsync(registerUser.Email);
                if (userExists != null)
                {
                    return Conflict(new List<object>() {new { Type="Email", Description = "Email already in use."}});
                }

                // If user doesnt exists
                AppUser newUser = new()
                {
                    Email = registerUser.Email,
                    UserName = registerUser.UserName,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    RefreshToken = Guid.NewGuid().ToString()
                };
                var result = await _userManager.CreateAsync(newUser, registerUser.Password);
                // Assign role

                if (!result.Succeeded) return StatusCode(500, new { Description = result.Errors });
                await _userManager.AddToRoleAsync(newUser, "User");
                
                //Add token to verify email
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                var confirmationLink = Url.Action(nameof(ConfirmEmail),"Auth", new {token, email=newUser.Email }, Request.Scheme);
                var message = new Message(new [] { newUser.Email! }, "Email validation", confirmationLink!);
                _emailService.SendEmail(message);

                return Ok(new List<object>() {new { Description = "User Successfully created"}});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Type="Server", Description = e.Message });
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    var result = await _userManager.ConfirmEmailAsync(user, token);
                    if (result.Succeeded)
                    {
                        return Ok(new List<object>() {new { Description = "Email verified successfully!"}});
                    }
                }
                return BadRequest(new List<object>() {new { Description = "Unable to verify email!"}});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500,new { Description = e.Message });
            }
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            try
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
                    var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                    
                    HttpContext.Response.Cookies.Append("token", token, new CookieOptions()
                    {
                        SameSite = SameSiteMode.None,
                        Expires = DateTimeOffset.Now.AddDays(14),
                        IsEssential = true,
                        Secure = true,
                        HttpOnly = true
                    });
                
                    return Ok(new
                    {
                        Roles = userRoles,
                        UserName = user.UserName
                    });
                }

                return Unauthorized(new List<object>() { new { Description = "Wrong username or password."} });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description = e.Message });
            }
            
        }
        
        [HttpGet("check-authentication")]
        public async Task<IActionResult> CheckAuthentication()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var username = User.Identity.Name;
                var user = await _userManager.FindByNameAsync(username);
                var roles = await _userManager.GetRolesAsync(user);

                return Ok(new { UserName = username, Roles = roles, UnAuthorized = false });
            }

            return Ok(new { UnAuthorized = true});
        }
        
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(refreshTokenDto.UserName);

                if (user == null || user.RefreshToken != refreshTokenDto.RefreshToken)
                {
                    return Unauthorized(new List<object>() {new { Description = "Invalid refresh token."}});
                }

                var refreshToken = new Guid().ToString();
                user.RefreshToken = refreshToken;
                await _userManager.UpdateAsync(user);

                var authClaims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var userRoles = await _userManager.GetRolesAsync(user);
                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                var accessToken = GetToken(authClaims);

                return Ok(new
                {
                    expiration = accessToken.ValidTo,
                    roles = userRoles,
                    token = new JwtSecurityTokenHandler().WriteToken(accessToken),
                    refreshToken
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description =  e.Message });
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience:_configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(14),
                claims:authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}
