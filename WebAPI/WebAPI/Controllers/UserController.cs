using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.UserModels;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;


    public UserController(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole<Guid>> roleManager
    )
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet]
    [SuppressMessage("ReSharper.DPA", "DPA0006: Large number of DB commands", MessageId = "count: 100")]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var users = await _userManager.Users.ToListAsync();

        var userDtos = users.Select(u => new UserDto
        {
            Id = u.Id.ToString(),
            UserName = u.UserName,
            Email = u.Email,
            Roles = _userManager.GetRolesAsync(u).Result.ToList()
        }).ToList();

        return userDtos;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                return Ok(new { Description = "User successfully deleted." });
            }
            return NotFound(new{Description="User not found."});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost("ChangeRole/{id}")]
    public async Task<IActionResult> ChangeRole(string id, UserRolesDto rolesDto)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var removeRolesResult = await _userManager.RemoveFromRolesAsync(user,userRoles);
                if (rolesDto.Roles != null && removeRolesResult.Succeeded )
                {
                    var result = await _userManager.AddToRolesAsync(user, rolesDto.Roles);
                    if (result.Succeeded)
                    {
                        return Ok(new { Description = "Roles added successfully." });
                    }
                }
                return StatusCode(500, new { Description = "Failed to add roles"});
            }

            return NotFound(new { Description = "User not found" });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {Description = e.Message });
        }
    }
}