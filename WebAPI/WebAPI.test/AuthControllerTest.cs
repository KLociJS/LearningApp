using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using WebAPI.Controllers;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Services;
using WebAPI.Utility;

namespace WebAPI.test;

public class AuthControllerTest
{
    private Mock<IUserService> _userServiceMock;
    private AuthController _authController;
    private Mock<IHttpContextAccessorWrapper> _httpContextMock;
    private Mock<IResponseCookies> _cookiesMock;

    [SetUp]
    public void Setup()
    {
        _userServiceMock = new Mock<IUserService>();
        _httpContextMock = new Mock<IHttpContextAccessorWrapper>();

        _httpContextMock.SetupGet(s => s.HttpContext)
            .Returns(new DefaultHttpContext());
        _cookiesMock = new Mock<IResponseCookies>();

        _authController = new AuthController(_userServiceMock.Object, _httpContextMock.Object);
    }

    #region Register
    [Test]
    public async Task Register_ValidInput_ReturnsOkResult()
    {
        // Arrange
        var registerUserDto = new RegisterUserDto
        {
            Email = "kisznerlorant21@gmail.com",
            Password = "Abcd@1234",
            UserName = "loci"
        };
        
        var registrationResult = RegisterResult.Success("User successfully created.");

        _userServiceMock.Setup(service => service.RegisterUserAsync(registerUserDto))
            .ReturnsAsync(registrationResult);

        // Act
        var result = await _authController.Register(registerUserDto);

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result);
    }

    [Test]
    public async Task Register_ValidInput_ReturnsServerError()
    {
        // Arrange
        var registerUserDto = new RegisterUserDto
        {
            Email = "kisznerlorant21@gmail.com",
            Password = "Abcd@1234",
            UserName = "loci"
        };

        var registrationResult = RegisterResult.ServerError();
        
        _userServiceMock.Setup(service => service.RegisterUserAsync(registerUserDto))
            .ReturnsAsync(registrationResult);

        var result = await _authController.Register(registerUserDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var serverErrorResult = result as ObjectResult;
        Assert.IsNotNull(serverErrorResult);
        Assert.AreEqual(registrationResult.Data.ErrorType, (serverErrorResult.Value as Result)?.ErrorType);
        Assert.AreEqual(registrationResult.Data.Description, (serverErrorResult.Value as Result)?.Description);
    }

    [Test]
    public async Task Register_InvalidInput_ReturnsBadRequest()
    {
        var registerUserDto = new RegisterUserDto
        {
            Email = "",
            Password = "",
            UserName = ""
        };
        
        _authController.ModelState.AddModelError("Email", "Email is required.");
        _authController.ModelState.AddModelError("Password", "Password is required.");
        _authController.ModelState.AddModelError("UserName", "Username is required.");

        var registrationResult = new Result
        {
            ErrorType = ErrorType.Client,
            Description = "Invalid input values."
        };
        
        var result = await _authController.Register(registerUserDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult);
        Assert.AreEqual(registrationResult.ErrorType, (badRequestResult.Value as Result)?.ErrorType);
        Assert.AreEqual(registrationResult.Description, (badRequestResult.Value as Result)?.Description);
    }

    [Test]
    public async Task Register_ValidInput_UserNameExists_ReturnsBadRequest()
    {
        var registerUserDto = new RegisterUserDto()
        {
            Email = "email@email.com",
            UserName = "loci",
            Password = "Abcd@1234"
        };

        var registrationResult = RegisterResult.UserNameExists();

        _userServiceMock.Setup(service => service.RegisterUserAsync(registerUserDto))
            .ReturnsAsync(registrationResult);

        var result = await _authController.Register(registerUserDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult);
        Assert.AreEqual(registrationResult.Data.ErrorType, (badRequestResult.Value as Result)?.ErrorType);
        Assert.AreEqual(registrationResult.Data.Description, (badRequestResult.Value as Result)?.Description);
    }

    [Test]
    public async Task Register_ValidInput_EmailExists_ReturnsBadRequest()
    {
        var registerUserDto = new RegisterUserDto()
        {
            Password = "Abcd@1234",
            Email = "Email@email.com",
            UserName = "loci"
        };

        var registrationResult = RegisterResult.EmailExists();

        _userServiceMock.Setup(service => service.RegisterUserAsync(registerUserDto))
            .ReturnsAsync(registrationResult);
        
        var result = await _authController.Register(registerUserDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult);
        Assert.AreEqual(registrationResult.Data.ErrorType, (badRequestResult.Value as Result)?.ErrorType);
        Assert.AreEqual(registrationResult.Data.Description, (badRequestResult.Value as Result)?.Description);
    }

    [Test]
    public async Task Register_ThrowsException()
    {
        var registerUserDto = new RegisterUserDto()
        {
            Password = "Abcd@1234",
            Email = "email@example.com",
            UserName = "username"
        };

        var registrationResult = RegisterResult.ServerError();

        _userServiceMock.Setup(service => service.RegisterUserAsync(registerUserDto))
            .ThrowsAsync(new Exception("Simulated exception"));

        var result = await _authController.Register(registerUserDto);

        Assert.IsInstanceOf<ObjectResult>(result);
        var errorResult = result as ObjectResult;
        Assert.AreEqual(500, errorResult.StatusCode);
        Assert.AreEqual(registrationResult.Data.ErrorType, (errorResult.Value as Result).ErrorType);
        Assert.AreEqual(registrationResult.Data.Description, (errorResult.Value as Result).Description);
    }
    
    #endregion

    #region ConfirmEmail
    [Test]
    public async Task ConfirmEmail_ValidEmailAndToken_ReturnsOkResult()
    {
        var email = "email.gmail.com";
        var token = Guid.NewGuid().ToString();

        var confirmResult = ConfirmEmailResult.Success();

        _userServiceMock.Setup(service => service.ConfirmEmailAsync(email, token))
            .ReturnsAsync(confirmResult);

        var result = await _authController.ConfirmEmail(email, token);
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.NotNull(okResult);
        Assert.AreEqual(confirmResult.Data.Description, (okResult.Value as Result).Description);
    }

    [Test]
    public async Task ConfirmEmail_ThrowsException_ReturnsServerError()
    {
        var email = "email.gmail.com";
        var token = Guid.NewGuid().ToString();

        var confirmResult = ConfirmEmailResult.ServerError();

        _userServiceMock.Setup(service => service.ConfirmEmailAsync(email, token))
            .ThrowsAsync(new Exception("Simulated Exception"));

        var result = await _authController.ConfirmEmail(email, token);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var serverErrorResult = result as ObjectResult;
        Assert.NotNull(serverErrorResult);
        Assert.AreEqual(confirmResult.Data.Description, (serverErrorResult.Value as Result).Description);
        Assert.AreEqual(confirmResult.Data.ErrorType, (serverErrorResult.Value as Result).ErrorType);
    }

    [Test]
    public async Task ConfirmEmail_WrongTokenOrEmail_ReturnsBadRequest()
    {
        var email = "email@gmail.com";
        var token = Guid.NewGuid().ToString();

        var confirmResult = ConfirmEmailResult.InvalidInput();

        _userServiceMock.Setup(service => service.ConfirmEmailAsync(email, token))
            .ReturnsAsync(confirmResult);

        var result = await _authController.ConfirmEmail(email, token);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.NotNull(badRequestResult);
        Assert.AreEqual(confirmResult.Data.ErrorType, (badRequestResult.Value as Result).ErrorType);
        Assert.AreEqual(confirmResult.Data.Description, (badRequestResult.Value as Result).Description);

    }
    
    #endregion

    #region Login

    [Test]
    public async Task Login_ValidInput_AssignsCookieToResponse()
    {
        var loginUserDto = new LoginUserDto() { UserName = "loci", Password = "Abcd@1234" };
        
        CookieOptions? capturedCookieOptions = null;
        string? capturedCookieName = null;
        
        var token = Guid.NewGuid().ToString();

        var loginResult = LoginResult.Success(token);

        _userServiceMock.Setup(service => service.LoginAsync(loginUserDto))
            .ReturnsAsync(loginResult);

        _httpContextMock.Setup(ctx => ctx.HttpContext.Response.Cookies.Append(
                It.IsAny<string>(), 
                It.IsAny<string>(), 
                It.IsAny<CookieOptions>()))
            .Callback<string, string, CookieOptions>((key, value, options) =>
            {
                capturedCookieOptions = options;
                capturedCookieName = key;
            });

        _authController = new AuthController(_userServiceMock.Object, _httpContextMock.Object);

        var result = await _authController.Login(loginUserDto);
        
        Assert.Multiple(() =>
        {
            Assert.AreEqual("token", capturedCookieName);
            Assert.AreEqual(SameSiteMode.None, capturedCookieOptions.SameSite);
            Assert.AreEqual(true, capturedCookieOptions.HttpOnly);
            Assert.AreEqual(true, capturedCookieOptions.Secure);
            Assert.AreEqual(true, capturedCookieOptions.IsEssential);

        });
    }

    [Test]
    public async Task Login_ValidInput_ReturnsOkResultWithRolesAndUserName()
    {
        var loginUserDto = new LoginUserDto() { UserName = "loci", Password = "Abcd@1234" };

        var token = Guid.NewGuid().ToString();
        var roles = new List<string>() { "User", "Admin", "Moderator" };

        var loginResult = LoginResult.Success(token);
        var expectedResult = new LoginResponseDto() { Roles = roles, UserName = loginUserDto.UserName };

        _userServiceMock.Setup(service => service.LoginAsync(loginUserDto))
            .ReturnsAsync(loginResult);
        _userServiceMock.Setup(service => service.GetRolesAsync(loginUserDto.UserName))
            .ReturnsAsync(roles);

        _authController = new AuthController(_userServiceMock.Object, _httpContextMock.Object);

        var result = await _authController.Login(loginUserDto);

        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.NotNull(okResult);

        var actualResult = okResult.Value as LoginResponseDto;
        Assert.AreEqual(expectedResult.Roles, actualResult.Roles);
        Assert.AreEqual(expectedResult.UserName, actualResult.UserName);
    }

    [Test]
    public async Task Login_invalidInput_ReturnsBadRequest()
    {
        var loginUserDto = new LoginUserDto()
        {
            UserName = "a",
            Password = "b"
        };

        var exceptedResult = new Result { Description = "Invalid inputs" };
        
        _authController.ModelState.AddModelError("Email", "Email is required.");
        _authController.ModelState.AddModelError("Password", "Password is required.");
        _authController.ModelState.AddModelError("UserName", "Username is required.");
        
        var result = await _authController.Login(loginUserDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequetResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequetResult);
        Assert.AreEqual(exceptedResult.Description, (badRequetResult.Value as Result).Description);
    }

    [Test]
    public async Task Login_WrongCredentials_ReturnsUnauthorized()
    {
        var loginUserDto = new LoginUserDto { UserName = "loci", Password = "123" };
        var exceptedResult = new Result { Description = "Wrong username or password." };

        var loginResult = LoginResult.Fail();

        _userServiceMock.Setup(service => service.LoginAsync(loginUserDto))
            .ReturnsAsync(loginResult);

        var result = await _authController.Login(loginUserDto);
        
        Assert.IsInstanceOf<UnauthorizedObjectResult>(result);
        var unauthorizedResult = result as UnauthorizedObjectResult;
        Assert.IsNotNull(unauthorizedResult);
        Assert.AreEqual(exceptedResult.Description, (unauthorizedResult.Value as Result).Description);
    }

    [Test]
    public async Task Login_ServerError_ReturnsStatusCode500()
    {
        var loginUserDto = new LoginUserDto();
        var exceptedResult = new Result { Description = "An error occured on the server." };

        _userServiceMock.Setup(service => service.LoginAsync(loginUserDto))
            .ThrowsAsync(new Exception());

        var result = await _authController.Login(loginUserDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var serverErrorResult = result as ObjectResult;
        Assert.NotNull(serverErrorResult);
        Assert.AreEqual(exceptedResult.Description, (serverErrorResult.Value as Result).Description);
    }
    #endregion

    #region Logout

    [Test]
    public void Logout_ReturnsExpiredCookie()
    {
        CookieOptions? capturedCookieOptions = null;
        string? capturedCookieName = null;

        _httpContextMock.Setup(ctx => ctx.HttpContext.Response.Cookies.Append(
                It.IsAny<string>(), 
                It.IsAny<string>(), 
                It.IsAny<CookieOptions>()))
            .Callback<string, string, CookieOptions>((key, value, options) =>
            {
                capturedCookieName = key;
                capturedCookieOptions = options;
            });

        _authController = new AuthController(_userServiceMock.Object, _httpContextMock.Object);

        _authController.Logout();
        
        Assert.Multiple(() =>
        {
            var expectedExpiration = DateTimeOffset.Now.AddDays(-1);
            var actualExpiration = capturedCookieOptions.Expires;

            Assert.IsTrue(actualExpiration >= expectedExpiration.AddSeconds(-1) && actualExpiration <= expectedExpiration.AddSeconds(1));
            Assert.AreEqual("token", capturedCookieName);
        });
        
    }

    [Test]
    public void Logout_ReturnsOkResult()
    {
        var result = _authController.Logout();
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual("Logged out.", (okResult.Value as Result).Description);
    }

    [Test]
    public void Logout_ServerError_ReturnsStatusCode500()
    {
        _httpContextMock.Setup(context => context.HttpContext.Response.Cookies)
            .Throws(new Exception("simulated Exception"));
        
        var result = _authController.Logout();
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var errorResult = result as ObjectResult;
        Assert.AreEqual("An error occured on the server.", (errorResult.Value as Result).Description);
    }
    
    #endregion

    #region Check-Auth

    [Test]
    public async Task CheckAuth_ValidUser_ReturnsOkResult()
    {
        var roles = new List<string>() { "User", "Admin", "Moderator" };
        var exceptedResult = new LoginResponseDto { UserName = "loci", Roles = roles };
        _httpContextMock.Setup(context => context.HttpContext.User.Identity!.Name)
            .Returns("loci");
        _userServiceMock.Setup(service => service.GetRolesAsync("loci"))
            .ReturnsAsync(roles);

        var result = await _authController.CheckAuthentication();
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResult.Roles, (okResult!.Value as LoginResponseDto)!.Roles);
        Assert.AreEqual(exceptedResult.UserName, (okResult!.Value as LoginResponseDto)!.UserName);

    }

    [Test]
    public async Task CheckAuth_ServerError_ReturnsStatusCode500()
    {
        _httpContextMock.Setup(context => context.HttpContext.User.Identity!.Name)
            .Throws(new Exception("Simulated exception"));
        
        var result = await _authController.CheckAuthentication();
        Assert.IsInstanceOf<ObjectResult>(result);
        var errorResult = result as ObjectResult;
        Assert.AreEqual("An error occured on the server.", (errorResult!.Value as Result)!.Description);
    }
    #endregion

    #region RequestPasswordChange

    [Test]
    public async Task RequestPasswordChange_InvalidInput_ReturnsBadRequest()
    {
        var emailDto = new EmailDto { Address = "email" };
        _authController.ModelState.AddModelError("email", "wrong email");

        var result = await _authController.RequestPasswordChange(emailDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.AreEqual("Invalid email.", (badRequestResult!.Value as Result)!.Description);
    }

    [Test]
    public async Task RequestPasswordChange_ValidEmail_ReturnsOkResult()
    {
        var emailDto = new EmailDto { Address = "email@email.com" };
        var requestResult = RequestPasswordChangeResult.Success();

        _userServiceMock.Setup(service => service.RequestPasswordChangeAsync(emailDto.Address))
            .ReturnsAsync(requestResult);

        var exceptedResult = new Result { Description = "Email with password change link sent." };

        var result = await _authController.RequestPasswordChange(emailDto);
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResult.Description, (okResult!.Value as Result)!.Description);
    }

    [Test]
    public async Task RequestPasswordChange_InvalidEmail_ReturnsBadRequest()
    {
        var emailDto = new EmailDto { Address = "email@email.com" };
        var requestResult = RequestPasswordChangeResult.WrongEmail();

        _userServiceMock.Setup(service => service.RequestPasswordChangeAsync(emailDto.Address))
            .ReturnsAsync(requestResult);

        var exceptedResult = new Result { Description = "Wrong email." };

        var result = await _authController.RequestPasswordChange(emailDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.AreEqual(exceptedResult.Description, (badRequestResult!.Value as Result)!.Description);
    }

    [Test]
    public async Task RequestPasswordChange_ServerError_ReturnsStatusCode500()
    {
        var emailDto = new EmailDto { Address = "email@email.com" };

        _userServiceMock.Setup(service => service.RequestPasswordChangeAsync(emailDto.Address))
            .ThrowsAsync(new Exception("Simulated exception"));

        var exceptedResult = new Result { Description = "An error occured on the server." };

        var result = await _authController.RequestPasswordChange(emailDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var badRequestResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (badRequestResult!.Value as Result)!.Description);
    }

    #endregion

    #region ChangeForgotPassword

    [Test]
    public async Task ChangeForgotPassword_ValidTokeAndEmail_ReturnsOkResult()
    {
        var resetPasswordDto = new ResetPasswordDto
        {
            Email = "email@email.com", 
            Password = "abcd@1234", 
            Token = Guid.NewGuid().ToString()
        };
        var changeForgotPasswordResult = ChangeForgotPasswordResult.Success();

        _userServiceMock.Setup(service => service.ChangeForgotPasswordAsync(resetPasswordDto))
            .ReturnsAsync(changeForgotPasswordResult);

        var exceptedResult = new Result { Description = "Password successfully changed." };

        var result = await _authController.ChangeForgotPassword(resetPasswordDto);
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResult.Description, (okResult!.Value as Result)!.Description);
    }

    [Test]
    public async Task ChangeForgotPassword_InvalidTokenOrEmail_ReturnsBadRequest()
    {
        var resetPasswordDto = new ResetPasswordDto
        {
            Email = "email@email.com", 
            Password = "abcd@1234", 
            Token = Guid.NewGuid().ToString()
        };
        var changeForgotPasswordResult = ChangeForgotPasswordResult.InvalidInput();

        _userServiceMock.Setup(service => service.ChangeForgotPasswordAsync(resetPasswordDto))
            .ReturnsAsync(changeForgotPasswordResult);

        var exceptedResult = new Result { Description = "Invalid credentials." };

        var result = await _authController.ChangeForgotPassword(resetPasswordDto);
        
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var okResult = result as BadRequestObjectResult;
        Assert.AreEqual(exceptedResult.Description, (okResult!.Value as Result)!.Description);
    }

    [Test]
    public async Task ChangeForgotPassword_ServerError_ReturnsStatusCode500()
    {
        var resetPasswordDto = new ResetPasswordDto
        {
            Email = "email@email.com", 
            Password = "abcd@1234", 
            Token = Guid.NewGuid().ToString()
        };

        _userServiceMock.Setup(service => service.ChangeForgotPasswordAsync(resetPasswordDto))
            .ThrowsAsync(new Exception("Simulated exception"));

        var exceptedResult = new Result { Description = "An error occured on the server." };

        var result = await _authController.ChangeForgotPassword(resetPasswordDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var okResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (okResult!.Value as Result)!.Description);
    }
    

    #endregion
}
