using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultDtos;

namespace WebAPI.Services;

public interface IUserService
{
    Task<RegisterResult> RegisterUserAsync(RegisterUserDto registerUserDto);
    Task<ConfirmEmailResult> ConfirmEmailAsync(string email, string token);
    Task<LoginResult> LoginAsync(LoginUserDto loginUserDto);
    Task<IList<string>> GetRolesAsync(string userName);
}