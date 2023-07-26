using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Services;

namespace WebAPI.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var getUsersResult = await _userService.GetUsersAsync();
            return Ok(getUsersResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            var result = new Result { Description = "An error occured on the server." };
            return StatusCode(500, result);
        }
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteUserById(string id)
    {
        try
        {
            var deletionResult = await _userService.DeleteUserByIdAsync(id);
            if (deletionResult.Succeeded)
            {
                return Ok(deletionResult.Data);
            }

            if (deletionResult.Data?.ErrorType == ErrorType.Server)
            {
                var result = new Result { Description = "An error occured on the server." };
                return StatusCode(500, result);
            }
            
            return NotFound(deletionResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            var result = new Result { Description = "An error occured on the server." };
            return StatusCode(500, result);
        }
    }

    [HttpPost("ChangeRole/{userId}")]
    public async Task<IActionResult> ChangeRole(string userId, UserRolesDto rolesDto)
    {
        try
        {
            var changeRoleResult = await _userService.ChangeRoleAsync(userId,rolesDto);
            if (changeRoleResult.Succeeded)
            {
                return Ok(changeRoleResult.Data);
            }

            if (changeRoleResult.Data!.ErrorType == ErrorType.UserName)
            {
                return NotFound(changeRoleResult.Data);
            }

            return StatusCode(500, changeRoleResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            var result = new Result { Description = "An error occured on the server" };
            return StatusCode(500, result);
        }
    }
}