using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultDtos;
using WebAPI.Services;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController( IUserService userService)
        {
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
                var result = RegisterResult.ServerError();
                return StatusCode(500, result.Data);
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

        [HttpPost("request-password-change")]
        public async Task<IActionResult> RequestPasswordChange(EmailDto email)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { Description = "Invalid email." });
                }
                var requestResult = await _userService.RequestPasswordChangeAsync(email.Address!);
                if (requestResult.Succeed)
                {
                    return Ok(new { requestResult.Description });
                }

                if (requestResult.ErrorType == ErrorType.Server)
                {
                    return StatusCode(500, new { requestResult.Description });
                }

                return BadRequest(new { requestResult.Description });

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description = "An error occured on the server."});
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ChangeForgotPassword(ResetPasswordDto resetPasswordDto)
        {
            try
            {
                var changeResult = await _userService.ChangeForgotPasswordAsync(resetPasswordDto);
                if (changeResult.Succeed)
                {
                    return Ok(new { changeResult.Description });
                }

                if (changeResult.ErrorType == ErrorType.Server)
                {
                    return StatusCode(500, new { changeResult.Description });
                }

                return BadRequest(new { changeResult.Description });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { Description = "An error occured on the server." });
            }

        }
        
    }
}
