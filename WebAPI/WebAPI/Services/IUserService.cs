using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;

namespace WebAPI.Services;

public interface IUserService
{
    Task<GetUserResult> GetUsers();
    Task<DeleteUserResult> DeleteUserById(string id);
    Task<ChangeRolesResult> ChangeRole(string userId, UserRolesDto rolesDto);
}