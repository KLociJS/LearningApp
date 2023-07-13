using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using User.Management.Service.Models;
using User.Management.Service.Services;
using WebAPI.Models;
using WebAPI.Models.AuthModels;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultDtos;
using WebAPI.Services;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        
        public AuthController(
            UserManager<AppUser> userManager,
            IEmailService emailService,
            IConfiguration configuration, IUserService userService)
        {
            _userManager = userManager;
            _emailService = emailService;
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var result = new Result() { ErrorType = ErrorType.Client, Description = "Invalid input values." };
                    return BadRequest(result);
                }

                var registrationResult = await _userService.RegisterUserAsync(registerUserDto);

                if (registrationResult.Succeeded)
                {
                    return Ok(registrationResult.Data);
                }

                if (registrationResult.Data.ErrorType == ErrorType.Server)
                {
                    return StatusCode(500, registrationResult.Data);
                }

                return BadRequest(registrationResult.Data);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var result = new Result()
                    { ErrorType = ErrorType.Server, Description = "An error occured on the server." };
                return StatusCode(500, result);
            }
        }

        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            try
            {
                var confirmationResult = await _userService.ConfirmEmailAsync(email, token);
                if (confirmationResult.Succeeded)
                {
                    return Ok(confirmationResult.Data);
                }

                if (confirmationResult.Data.ErrorType == ErrorType.Server)
                {
                    return StatusCode(500, confirmationResult.Data);
                }

                return BadRequest(confirmationResult.Data);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var serverError = new Result() { ErrorType = ErrorType.Server, Description = "An error occured on the server."};
                return StatusCode(500,serverError);
            }
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { Description = "Invalid inputs" });
                }
                
                var authResult = await _userService.LoginAsync(loginUserDto);

                if (authResult.Succeeded)
                {
                    HttpContext.Response.Cookies.Append("token", authResult.Token, new CookieOptions()
                    {
                        SameSite = SameSiteMode.None,
                        Expires = DateTimeOffset.Now.AddDays(14),
                        IsEssential = true,
                        Secure = true,
                        HttpOnly = true
                    });

                    var roles = await _userService.GetRolesAsync(loginUserDto.UserName!);
                    
                    return Ok(new
                    {
                        Roles = roles, loginUserDto.UserName
                    });
                }

                return Unauthorized(new { Description = "Wrong username or password."});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            try
            {
                HttpContext.Response.Cookies.Append("token", "", new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.Now,
                    IsEssential = true,
                    Secure = true,
                    HttpOnly = true
                });
                return Ok(new { Description = "Logged out."});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description = e.Message });
            }
        }

        [Authorize]
        [HttpGet("check-authentication")]
        public async Task<IActionResult> CheckAuthentication()
        {
            var username = User.Identity!.Name;
            var roles = await _userService.GetRolesAsync(username!);

            return Ok(new { UserName = username, Roles = roles });
            
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(EmailDto email)
        {
            var user = await _userManager.FindByEmailAsync(email.Address);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var url = $"http://localhost:3000/forgot-password?token={HttpUtility.UrlEncode(token)}";

                var message = new Message(new[] { email.Address! }, "Reset password", url);
                _emailService.SendEmail(message);

                return Ok(new { Description = "Reset password email sent." });
            }

            return BadRequest(new { Description = "Could not find user by email."});
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ChangeForgotPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
                if (!result.Succeeded)
                {
                    return BadRequest("Could not change password");
                }

                return Ok(new { Description = "Password changed." });
            }

            return BadRequest(new { Description = "Could not reset password" });

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
