using WebAPI.Models.AuthModels;
using WebAPI.Models.ResultModels;

namespace WebAPI.Services;

public interface IUserService
{
    Task<OperationResult> RegisterUserAsync(RegisterUserDto registerUserDto);
    Task<OperationResult> ConfirmEmailAsync(string email, string token);
}