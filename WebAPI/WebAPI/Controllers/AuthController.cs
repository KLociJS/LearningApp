using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using User.Management.Service.Models;
using User.Management.Service.Services;
using WebAPI.Models;
using WebAPI.Models.AuthModel;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly IEmailService _emailService;
        
        public AuthController(UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager,IEmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
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
                    return Conflict("Email already in use");
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

                return Ok("User successfully created!");
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

    }
}
