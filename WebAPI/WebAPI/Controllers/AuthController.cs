using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IConfiguration _configuration;
        
        public AuthController(UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
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

                return Ok("User successfully created!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }
    }
}
