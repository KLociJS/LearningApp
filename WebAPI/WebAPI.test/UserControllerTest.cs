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

    [Test]
    public async Task GetUsers_ReturnsUserDtoList()
    {
        var userDtoList = new List<UserDto>()
        {
            new UserDto() { UserName = "user1" },
            new UserDto() { UserName = "user2" },
            new UserDto() { UserName = "user3" },
        };

        _mockUserService.Setup(service => service.GetUsers())
            .ReturnsAsync(userDtoList);

        var result = await _userController.GetUsers();
        
        Assert.IsInstanceOf<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.AreEqual(userDtoList, (okResult?.Value as GetUserResult)?.Data);
    }

    [Test]
    public async Task GetUsers_ServerError_ReturnsStatusCode500()
    {
        _mockUserService.Setup(service => service.GetUsers())
            .Throws<Exception>();
        var exceptedResult = new Result { Description = "An error occured on the server." };

        var result = await _userController.GetUsers();
        
        Assert.IsInstanceOf<ObjectResult>(result);
        var errorResult = result as ObjectResult;
        Assert.AreEqual(exceptedResult.Description, (errorResult?.Value as Result)?.Description);
    }
}