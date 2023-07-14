using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using WebAPI.Controllers;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultDtos;
using WebAPI.Services;

namespace WebAPI.test;

public class AuthControllerTest
{
    private Mock<IUserService> _userServiceMock;
    private AuthController _authController;
    
    [SetUp]
    public void Setup()
    {
        _userServiceMock = new Mock<IUserService>();
        _authController = new AuthController(_userServiceMock.Object);
    }

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
        // Arrange
        var registerUserDto = new RegisterUserDto
        {
            Email = "",
            Password = "",
            UserName = ""
        };

        // Simulate invalid ModelState by adding errors
        _authController.ModelState.AddModelError("Email", "Email is required.");
        _authController.ModelState.AddModelError("Password", "Password is required.");
        _authController.ModelState.AddModelError("UserName", "Username is required.");

        var registrationResult = new Result
        {
            ErrorType = ErrorType.Client,
            Description = "Invalid input values."
        };

        // Act
        var result = await _authController.Register(registerUserDto);

        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult);
        Assert.AreEqual(registrationResult.ErrorType, (badRequestResult.Value as Result)?.ErrorType);
        Assert.AreEqual(registrationResult.Description, (badRequestResult.Value as Result)?.Description);
    }

    [Test]
    public async Task ValidInput_UserNameExists_ReturnsBadRequest()
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
    public async Task ValidInput_EmailExists_ReturnsBadRequest()
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
}
