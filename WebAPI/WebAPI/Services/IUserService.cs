using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;

namespace WebAPI.Services;

public interface IUserService
{
    Task<GetUserResult> GetUsersAsync();
    Task<DeleteUserResult> DeleteUserByIdAsync(string id);
    Task<ChangeRolesResult> ChangeRole(string userId, UserRolesDto rolesDto);
}