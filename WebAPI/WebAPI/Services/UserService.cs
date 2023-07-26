using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;

namespace WebAPI.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

    public UserService(UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<GetUserResult> GetUsersAsync()
    {
        try
        {
            var users = await _userManager.Users.Include(user=>user.Roles).ToListAsync();
            var userDtoList = GetUserDtoList(users);
            return GetUserResult.Success(userDtoList);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<DeleteUserResult> DeleteUserByIdAsync(string id)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                return DeleteUserResult.Success();
            }
            return DeleteUserResult.UserNotFound();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<ChangeRolesResult> ChangeRoleAsync(string userId, UserRolesDto rolesDto)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var removeRolesResult = await _userManager.RemoveFromRolesAsync(user,userRoles);
                if (removeRolesResult.Succeeded)
                {
                    var result = await _userManager.AddToRolesAsync(user, rolesDto.Roles);
                    if (result.Succeeded)
                    {
                        return ChangeRolesResult.Success();
                    }
                }
                return ChangeRolesResult.ServerError();
            }
            return ChangeRolesResult.UserNotFound();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private List<UserDto> GetUserDtoList(List<AppUser> users)
    {
        var roles = _roleManager.Roles.ToList();

        return users.Select(u => new UserDto
        {
            Id = u.Id.ToString(),
            UserName = u.UserName,
            Email = u.Email,
            Roles = roles.Where(r=>u.Roles.Select(ru=>ru.RoleId).Contains(r.Id)).Select(rn=>rn.Name).ToList()
        }).ToList();
    }
}