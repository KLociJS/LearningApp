using System.Web;
using Microsoft.AspNetCore.Identity;
using User.Management.Service.Models;
using WebAPI.Models;
using WebAPI.Models.AuthModels;
using WebAPI.Models.ResultModels;
using IEmailService = User.Management.Service.Services.IEmailService;

namespace WebAPI.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IEmailService _emailService;

    public UserService(
        UserManager<AppUser> userManager,
        IEmailService emailService
    )
    {
        _userManager = userManager;
        _emailService = emailService;
    }

    public async Task<OperationResult> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
        try
        {

            var userNameExists = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (userNameExists != null)
            {
                return OperationResult.UserNameExists();
            }

            var userEmailExists = await _userManager.FindByEmailAsync(registerUserDto.Email);
            if (userEmailExists != null)
            {
                return OperationResult.EmailExists();
            }
                
            var newUser = CreateUser(registerUserDto.Email, registerUserDto.UserName);
            var userCreationResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!userCreationResult.Succeeded)
            {
                return OperationResult.ServerError();
            }

            var assignRoleResult = await _userManager.AddToRoleAsync(newUser, "User");
            if (!assignRoleResult.Succeeded)
            {
                return OperationResult.ServerError();
            }

            var confirmationLink = await GenerateConfirmationLink(newUser);
            _emailService.SendEmailConfirmationLink(confirmationLink, new []{ registerUserDto.Email });

            return OperationResult.Success("User successfully created.");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return OperationResult.ServerError();
        }
    }

    public async Task<OperationResult> ConfirmEmailAsync(string email, string token)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var confirmationResult = await _userManager.ConfirmEmailAsync(user, token);
                if (confirmationResult.Succeeded)
                {
                    return OperationResult.Success("Email verified successfully!");
                }

                return OperationResult.ServerError();
            }

            return OperationResult.InvalidInput("Verification failed, invalid link");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return OperationResult.ServerError();
        }
    }
    
    private AppUser CreateUser(string email, string userName)
    {
        return new AppUser()
        {
            Email = email,
            UserName = userName,
            SecurityStamp = Guid.NewGuid().ToString(),
            RefreshToken = Guid.NewGuid().ToString()
        };
    }
    
    private async Task<string> GenerateConfirmationLink(AppUser user)
    {
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        return $"http://localhost:3000/confirm-email?email={HttpUtility.UrlEncode(user.Email)}&token={HttpUtility.UrlEncode(token)}";
    }
}