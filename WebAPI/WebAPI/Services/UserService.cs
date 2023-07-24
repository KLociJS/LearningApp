using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Identity;
using User.Management.Service.Models;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultModels;
using WebAPI.Utility;
using IEmailService = User.Management.Service.Services.IEmailService;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace WebAPI.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IEmailService _emailService;
    private readonly ITokenProvider _tokenProvider;

    public UserService(
        UserManager<AppUser> userManager,
        IEmailService emailService,
        ITokenProvider tokenProvider
        )
    {
        _userManager = userManager;
        _emailService = emailService;
        _tokenProvider = tokenProvider;
    }

    public async Task<RegisterResult> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
        try
        {
            var userNameExists = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (userNameExists != null)
            {
                return RegisterResult.UserNameExists();
            }

            var userEmailExists = await _userManager.FindByEmailAsync(registerUserDto.Email);
            if (userEmailExists != null)
            {
                return RegisterResult.EmailExists();
            }
                
            var newUser = CreateUser(registerUserDto.Email, registerUserDto.UserName);
            var userCreationResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!userCreationResult.Succeeded)
            {
                throw new Exception("Failed to create user.");
            }

            var assignRoleResult = await _userManager.AddToRoleAsync(newUser, "User");
            if (!assignRoleResult.Succeeded)
            {
                throw new Exception("Failed to assign role.");
            }

            var confirmationLink = await GenerateConfirmationLink(newUser);
            var sendEmailResult = _emailService.SendEmailConfirmationLink(confirmationLink, new []{ registerUserDto.Email });
            if (!sendEmailResult.Succeeded)
            {
                throw new Exception("Failed to send email.");
            }

            return RegisterResult.Success("User successfully created.");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception(e.Message);
        }
    }

    public async Task<ConfirmEmailResult> ConfirmEmailAsync(string email, string token)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var confirmationResult = await _userManager.ConfirmEmailAsync(user, token);
                if (confirmationResult.Succeeded)
                {
                    return ConfirmEmailResult.Success();
                }

                return ConfirmEmailResult.ServerError();
            }

            return ConfirmEmailResult.InvalidInput();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An error occured on the server.");
        }
    }

    public async Task<LoginResult> LoginAsync(LoginUserDto loginUserDto)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(loginUserDto.UserName);
            if (user != null)
            { 
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);
                if (isPasswordValid)
                {
                    var token = await GetJwtTokenAsync(user, loginUserDto.Password!);
                    return LoginResult.Success(token!);
                }
            }
            return LoginResult.Fail();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An error occured on the server.");
        }
    }

    public async Task<RequestPasswordChangeResult> RequestPasswordChangeAsync(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var url = $"http://localhost:3000/forgot-password?token={HttpUtility.UrlEncode(token)}";
                
                var message = new Message(new[] { email }, "Reset password", url);
                _emailService.SendEmail(message);

                return RequestPasswordChangeResult.Success(token);
            }
            return RequestPasswordChangeResult.WrongEmail();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An error occured on the server.");
        }
    }

    public async Task<ChangeForgotPasswordResult> ChangeForgotPasswordAsync(ResetPasswordDto resetPasswordDto)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
                if (result.Succeeded)
                {
                    return ChangeForgotPasswordResult.Success();
                }
                return ChangeForgotPasswordResult.ServerError();
            }
            return ChangeForgotPasswordResult.InvalidInput();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception(e.Message);
        }
    }
    public async Task<IList<string>> GetRolesAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        return await _userManager.GetRolesAsync(user);
    }

    private async Task<string?> GetJwtTokenAsync(AppUser user, string password)
    {
        var claims = await GetClaims(user);
        var token = _tokenProvider.GetJwtSecurityToken(claims);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<List<Claim>> GetClaims(AppUser user)
    {
        var authClaims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        
        var userRoles = await _userManager.GetRolesAsync(user);
        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        return authClaims;
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