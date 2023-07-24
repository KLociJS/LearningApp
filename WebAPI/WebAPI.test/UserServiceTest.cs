using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;
using User.Management.Service.Models;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultModels;
using WebAPI.Services;
using WebAPI.Utility;

namespace WebAPI.test;

[TestFixture]
public class UserServiceTest
{
    private Mock<UserManager<AppUser>> _userManagerMock;
    private Mock<IUserStore<AppUser>> _mockUserStore;
    private Mock<User.Management.Service.Services.IEmailService> _emailServiceMock;
    private Mock<ITokenProvider> _tokenProviderMock;
    private IUserService _userService;

    [SetUp]
    public void Setup()
    {
        _mockUserStore = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new Mock<UserManager<AppUser>>(_mockUserStore.Object,null,null,null,null,null,null,null,null);
        _emailServiceMock = new Mock<User.Management.Service.Services.IEmailService>();
        _tokenProviderMock = new Mock<ITokenProvider>();
        _userService = new UserService(_userManagerMock.Object,_emailServiceMock.Object,_tokenProviderMock.Object);
    }

    #region RegisterUserAsync

    [Test]
    public async Task RegisterUserAsync_UserNameExists_ReturnsUserNameExistsResult()
    {
        var registerUserDto = new RegisterUserDto { UserName = "loci"};
        var appUser = new AppUser { UserName = "loci"};
        _userManagerMock.Setup(service => service.FindByNameAsync(registerUserDto.UserName))
            !.ReturnsAsync((string username) =>
            {
                if (username == appUser.UserName)
                    return appUser;
                return null;
            });

        var exceptedResult = RegisterResult.UserNameExists();

        var result = await _userService.RegisterUserAsync(registerUserDto);
        
        Assert.IsInstanceOf<RegisterResult>(result);
        Assert.AreEqual(exceptedResult.Data.Description, result.Data.Description);
        Assert.AreEqual(exceptedResult.Data.ErrorType, result.Data.ErrorType);
    }

    [Test]
    public async Task RegisterUserAsync_EmailExists_ReturnsEmailArldyExistsResult()
    {
        var registerUserDto = new RegisterUserDto { Email = "email@email.com"};
        var appUser = new AppUser { Email = "email@email.com" };
        _userManagerMock.Setup(service => service.FindByEmailAsync(registerUserDto.Email))
            !.ReturnsAsync((string email) =>
            {
                if (email == appUser.Email)
                    return appUser;
                return null;
            });

        var exceptedResult = RegisterResult.EmailExists();

        var result = await _userService.RegisterUserAsync(registerUserDto);
        
        Assert.IsInstanceOf<RegisterResult>(result);
        Assert.AreEqual(exceptedResult.Data.Description, result.Data.Description);
        Assert.AreEqual(exceptedResult.Data.ErrorType, result.Data.ErrorType);
    }

    [Test]
    public void RegisterUserAsync_CreatUser_ReturnsValidAppUser()
    {
        var exceptedUser = new AppUser { Email = "email@email.com", UserName = "loci", };
        MethodInfo methodInfo = typeof(UserService).GetMethod("CreateUser", BindingFlags.NonPublic | BindingFlags.Instance)!;
        object[] parameters = { "email@email.com", "loci" };
        var result = methodInfo.Invoke(_userService, parameters);
        
        Assert.AreEqual(exceptedUser.Email, (result as AppUser)!.Email);
        Assert.AreEqual(exceptedUser.UserName, (result as AppUser)!.UserName);
    }

    [Test]
    public void RegisterUserAsync_CreateAsyncNotSucceeded_ThrowsException()
    {
        var registerUserDto = new RegisterUserDto();

        var createAsyncResult = IdentityResult.Failed();

        _userManagerMock.Setup(service => service.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(createAsyncResult);
        
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.RegisterUserAsync(registerUserDto));

        Assert.AreEqual("Failed to create user.", exception!.Message);
    }

    [Test]
    public void RegisterUserAsync_FailedToAssignRole_ThrowsException()
    {
        var registerUserDto = new RegisterUserDto();
        
        var createAsyncResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(createAsyncResult);
        
        var addRoleResult = IdentityResult.Failed();
        _userManagerMock.Setup(service => service.AddToRoleAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(addRoleResult);
        
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.RegisterUserAsync(registerUserDto));
        
        Assert.AreEqual("Failed to assign role." , exception!.Message);
    }

    [Test]
    public void RegisterUserAsync_FailedToSendEmail_ThrowsException()
    {
        var registerUserDto = new RegisterUserDto();
        
        var createAsyncResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(createAsyncResult);
        
        var addRoleResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.AddToRoleAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(addRoleResult);

        var sendEmailResult = SendEmailResult.Fail();
        _emailServiceMock.Setup(service => service.SendEmailConfirmationLink(It.IsAny<string>(), It.IsAny<string[]>()))
            .Returns(sendEmailResult);
        
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.RegisterUserAsync(registerUserDto));
        
        Assert.AreEqual("Failed to send email." , exception!.Message);
    }

    [Test]
    public async Task RegisterUserAsync_SuccessfulRegistration_ReturnsRegisterResultSucceeded()
    {
        var registerUserDto = new RegisterUserDto();
        
        var createAsyncResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(createAsyncResult);
        
        var addRoleResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.AddToRoleAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(addRoleResult);

        var sendEmailResult = SendEmailResult.Success();
        _emailServiceMock.Setup(service => service.SendEmailConfirmationLink(It.IsAny<string>(), It.IsAny<string[]>()))
            .Returns(sendEmailResult);

        var exceptedResult = RegisterResult.Success("User successfully created.");
        var result = await _userService.RegisterUserAsync(registerUserDto);
        
        Assert.IsInstanceOf<RegisterResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded, result.Succeeded);
        Assert.AreEqual(exceptedResult.Data.Description, result.Data.Description);
    }

    [Test]
    public async Task GenerateConfirmationLink_ReturnsValidUrl()
    {
        var appUser = new AppUser() { Email = "email@email.com" };
        var token = Guid.NewGuid().ToString();
        
        _userManagerMock.Setup(service => service.GenerateEmailConfirmationTokenAsync(It.IsAny<AppUser>()))
            .ReturnsAsync(token);
        
        MethodInfo methodInfo = typeof(UserService).GetMethod("GenerateConfirmationLink", BindingFlags.NonPublic | BindingFlags.Instance)!;
        object[] parameters = { appUser };
        dynamic result = methodInfo.Invoke(_userService, parameters)!;
        await result;

        var exceptedResult =
            $"http://localhost:3000/confirm-email?email={HttpUtility.UrlEncode(appUser.Email)}&token={HttpUtility.UrlEncode(token)}";
        
        Assert.AreEqual(exceptedResult, result.GetAwaiter().GetResult());

    }
    #endregion

    #region ConfirmEmailAsync

    [Test]
    public async Task ConfirmEmailAsync_EmailNotFound_ReturnsConfirmResultInvalidInput()
    {
        var email = "";
        var token = Guid.NewGuid().ToString();

        var exceptedResult = ConfirmEmailResult.InvalidInput();
        var result = await _userService.ConfirmEmailAsync(email,token);
        
        Assert.IsInstanceOf<ConfirmEmailResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data.Description,result.Data.Description);
    }

    [Test]
    public async Task ConfirmEmailAsync_FailToValidateToken_ReturnsError()
    {
        var email = "";
        var token = Guid.NewGuid().ToString();

        var appUser = new AppUser();
        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);

        var failedConfirmResult = IdentityResult.Failed();
        _userManagerMock.Setup(service => service.ConfirmEmailAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(failedConfirmResult);
            
        var exceptedResult = ConfirmEmailResult.ServerError();
        var result = await _userService.ConfirmEmailAsync(email, token);
        
        Assert.IsInstanceOf<ConfirmEmailResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data.Description,result.Data.Description);
    }

    [Test]
    public async Task ConfirmEmailAsync_EmailConfirms_ReturnsConfirmEmailSuccessResult()
    {
        var email = "";
        var token = Guid.NewGuid().ToString();

        var appUser = new AppUser();
        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);

        var confirmResult = IdentityResult.Success;
        _userManagerMock.Setup(service => service.ConfirmEmailAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(confirmResult);
            
        var exceptedResult = ConfirmEmailResult.Success();
        var result = await _userService.ConfirmEmailAsync(email, token);
        
        Assert.IsInstanceOf<ConfirmEmailResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data.Description,result.Data.Description);
    }

    [Test]
    public void ConfirmEmailAsync_Error_throwsException()
    {
        var email = "";
        var token = Guid.NewGuid().ToString();
        
        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .Throws<Exception>();
        
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.ConfirmEmailAsync(email,token));
        
        Assert.AreEqual("An error occured on the server." , exception!.Message);
    }
    #endregion

    #region LoginAsync

    [Test]
    public async Task LoginUserAsync_WrongUsername_ReturnsFailedLoginResult()
    {
        var loginUserDto = new LoginUserDto();
        var exceptedResult = LoginResult.Fail();
        var result = await _userService.LoginAsync(loginUserDto);
        
        Assert.IsInstanceOf<LoginResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded, result.Succeeded);
        Assert.AreEqual(exceptedResult.Description, result.Description);
    }

    [Test]
    public async Task LoginUserAsync_ValidUserNameWrongPassword_ReturnsFailedLoginResult()
    {
        var appUser = new AppUser();
        var loginUserDto = new LoginUserDto();
        var exceptedResult = LoginResult.Fail();

        _userManagerMock.Setup(service => service.FindByNameAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);
        _userManagerMock.Setup(service => service.CheckPasswordAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(false);

        var result = await _userService.LoginAsync(loginUserDto);
        
        Assert.IsInstanceOf<LoginResult>(result);
        Assert.AreEqual(exceptedResult.Description,result.Description);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
    }

    [Test]
    public async Task LoginUserAsync_ValidCredentials_ReturnsSucceededLoginResult()
    {
        var appUser = new AppUser() { UserName = "asd"};
        var loginUserDto = new LoginUserDto();
        var token = new JwtSecurityToken();
        var exceptedResult = LoginResult.Success(token.ToString());
        
        _userManagerMock.Setup(service => service.FindByNameAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);
        _userManagerMock.Setup(service => service.CheckPasswordAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(true);
        _userManagerMock.Setup(service => service.GetRolesAsync(It.IsAny<AppUser>()))
            .ReturnsAsync(new List<string>());
        _tokenProviderMock.Setup(service => service.GetJwtSecurityToken(It.IsAny<List<Claim>>()))
            .Returns(token);

        var result = await _userService.LoginAsync(loginUserDto);
        
        Assert.IsInstanceOf<LoginResult>(result);
        Assert.AreEqual(exceptedResult.Description, result.Description);
        Assert.AreEqual(exceptedResult.Succeeded, result.Succeeded);

    }

    [Test]
    public async Task LoginUserAsync_ServerError_ThrowsException()
    {
        var loginUserDto = new LoginUserDto();
        _userManagerMock.Setup(service => service.FindByNameAsync(It.IsAny<string>()))
            .Throws<Exception>();
            
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.LoginAsync(loginUserDto));
        Assert.AreEqual("An error occured on the server." , exception!.Message);
    }

    #endregion

    #region MyRegion

    [Test]
    public async Task RequestPasswordChangeAsync_EmailNotFound_ReturnsWrongEmailResult()
    {
        var email = "";
        var exceptedResult = RequestPasswordChangeResult.WrongEmail();
        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((AppUser)null!);

        var result = await _userService.RequestPasswordChangeAsync(email);
        
        Assert.IsInstanceOf<RequestPasswordChangeResult>(result);
        Assert.AreEqual(exceptedResult.Succeed,result.Succeed);
        Assert.AreEqual(exceptedResult.Data!.Description, result.Data!.Description);
    }

    [Test]
    public async Task RequestPasswordChangeAsync_ValidEmail_ReturnsSucceededRequestResult()
    {
        var email = "";
        var user = new AppUser();
        var token = Guid.NewGuid().ToString();
        var exceptedResult = RequestPasswordChangeResult.Success(token);
        
        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync(user);
        _userManagerMock.Setup(service => service.GeneratePasswordResetTokenAsync(It.IsAny<AppUser>()))
            .ReturnsAsync(token);
        var result = await _userService.RequestPasswordChangeAsync(email);
        Assert.IsInstanceOf<RequestPasswordChangeResult>(result);
        Assert.AreEqual(exceptedResult.Succeed,result.Succeed);
        Assert.AreEqual(exceptedResult.Token,result.Token);
        Assert.AreEqual(exceptedResult.Data!.Description,result.Data!.Description);

    }
    [Test]
    public async Task RequestPasswordChangeAsync_serverError_ThrowsException()
    {
        var email = "";

        _userManagerMock.Setup(service => service.FindByEmailAsync(It.IsAny<string>()))
            .Throws<Exception>();
        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.RequestPasswordChangeAsync(email));
        
        Assert.AreEqual("An error occured on the server.", exception!.Message);
    }

    #endregion
}