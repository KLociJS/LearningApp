using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Identity;
using User.Management.Service.Models;
using WebAPI.Models;
using WebAPI.Models.AuthModels;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultDtos;
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
        IEmailService emailService, ITokenProvider tokenProvider)
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
                return RegisterResult.ServerError();
            }

            var assignRoleResult = await _userManager.AddToRoleAsync(newUser, "User");
            if (!assignRoleResult.Succeeded)
            {
                return RegisterResult.ServerError();
            }

            var confirmationLink = await GenerateConfirmationLink(newUser);
            _emailService.SendEmailConfirmationLink(confirmationLink, new []{ registerUserDto.Email });

            return RegisterResult.Success("User successfully created.");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return RegisterResult.ServerError();
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
            return ConfirmEmailResult.ServerError();
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
            return LoginResult.ServerError();
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