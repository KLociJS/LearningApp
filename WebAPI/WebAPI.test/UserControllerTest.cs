using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using WebAPI.Controllers;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Services;

namespace WebAPI.test;

[TestFixture]
public class UserControllerTest
{
    private Mock<IUserService> _mockUserService;
    private UserController _userController;

    [SetUp]
    public void Setup()
    {
        _mockUserService = new Mock<IUserService>();
        _userController = new UserController(_mockUserService.Object);
    }

    #region GetUsers
    [Test]
    public async Task GetUsers_ReturnsUserDtoList()
    {
        var userDtoList = new List<UserDto>()
        {
            new UserDto() { UserName = "user1" },
            new UserDto() { UserName = "user2" },
            new UserDto() { UserName = "user3" },
        };
        var exceptedResponse = new GetUsersResponseDto() { UserDtos = userDtoList };
        var exceptedResult = new GetUserResult(true) { Data = exceptedResponse };

        _mockUserService.Setup(service => service.GetUsersAsync())
            .ReturnsAsync(exceptedResult);

        var result = await _userController.GetUsers();
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResponse.UserDtos, (okResult?.Value as GetUsersResponseDto)?.UserDtos);
        Assert.AreEqual(exceptedResponse.Description, (okResult?.Value as GetUsersResponseDto)?.Description);
    }

    [Test]
    public async Task GetUsers_ServerError_ReturnsStatusCode500()
    {
        _mockUserService.Setup(service => service.GetUsersAsync())
            .Throws<Exception>();
        var exceptedResult = new Result { Description = "An error occured on the server." };

        var result = await _userController.GetUsers();
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var errorResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (errorResult?.Value as Result)?.Description);
    }
    #endregion

    #region DeleteUser

    [Test]
    public async Task DeleteUser_UserFound_ReturnsOkResult()
    {
        var exceptedResult = DeleteUserResult.Success();
        _mockUserService.Setup(service => service.DeleteUserByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(exceptedResult);
        
        var result = await _userController.DeleteUserById("1");
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResult.Data?.Description, (okResult?.Value as Result)?.Description);
    }
    
    [Test]
    public async Task DeleteUser_UserNotFound_ReturnsNotfound()
    {
        var exceptedResult = DeleteUserResult.UserNotFound();
        _mockUserService.Setup(service => service.DeleteUserByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(exceptedResult);

        var result = await _userController.DeleteUserById("1");
        Assert.IsInstanceOf<NotFoundObjectResult>(result);
        var notFoundResult = result as NotFoundObjectResult;
        Assert.AreEqual(exceptedResult.Data?.Description, (notFoundResult?.Value as Result)?.Description);
    }

    [Test]
    public async Task DeleteUser_ServerError_ReturnsStatusCode500()
    {
        _mockUserService.Setup(service => service.DeleteUserByIdAsync(It.IsAny<string>()))
            .Throws<Exception>();
        var exceptedResult = new Result { Description = "An error occured on the server." };

        var result = await _userController.DeleteUserById("1");
        Assert.IsInstanceOf<ObjectResult>(result);
        var serverErrorResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (serverErrorResult?.Value as Result)?.Description);
    }
    #endregion
    
    #region ChangeRole

    [Test]
    public async Task ChangeRole_ValidUserAndRoles_ReturnsOkResult()
    {
        var userRolesDto = new UserRolesDto();
        var exceptedResult = ChangeRolesResult.Success();

        _mockUserService.Setup(service => service.ChangeRoleAsync(It.IsAny<string>(), It.IsAny<UserRolesDto>()))
            .ReturnsAsync(exceptedResult);

        var result = await _userController.ChangeRole("", userRolesDto);
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(exceptedResult.Data?.Description, (okResult?.Value as Result)?.Description);
    }

    [Test]
    public async Task ChangeRole_UserNotFound_ReturnsNotFound()
    {
        var userRolesDto = new UserRolesDto();
        var exceptedResult = ChangeRolesResult.UserNotFound();

        _mockUserService.Setup(service => service.ChangeRoleAsync(It.IsAny<string>(), It.IsAny<UserRolesDto>()))
            .ReturnsAsync(exceptedResult);

        var result = await _userController.ChangeRole("", userRolesDto);
        
        Assert.IsInstanceOf<NotFoundObjectResult>(result);
        var okResult = result as NotFoundObjectResult;
        Assert.AreEqual(exceptedResult.Data?.Description, (okResult?.Value as Result)?.Description);
    }

    [Test]
    public async Task ChangeRole_RoleManagerError_ReturnsStatusCode500()
    {
        var userRolesDto = new UserRolesDto();
        var exceptedResult = ChangeRolesResult.ServerError();

        _mockUserService.Setup(service => service.ChangeRoleAsync(It.IsAny<string>(), It.IsAny<UserRolesDto>()))
            .ReturnsAsync(exceptedResult);

        var result = await _userController.ChangeRole("", userRolesDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var okResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Data?.Description, (okResult?.Value as Result)?.Description);
        
    }

    [Test]
    public async Task ChangeRole_ServerError_ReturnsStatusCode500()
    {
        var userRolesDto = new UserRolesDto();
        var exceptedResult = new Result { Description = "An error occured on the server" };

        _mockUserService.Setup(service => service.ChangeRoleAsync(It.IsAny<string>(), It.IsAny<UserRolesDto>()))
            .Throws<Exception>();

        var result = await _userController.ChangeRole("", userRolesDto);
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var okResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (okResult?.Value as Result)?.Description);
        
    }
    #endregion
    
}