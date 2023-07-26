using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultModels;
using WebAPI.Services;

namespace WebAPI.test;

[TestFixture]
public class UserServiceTest
{
    private Mock<UserManager<AppUser>> _mockUserManager;
    private Mock<IUserStore<AppUser>> _mockUserStore;
    private Mock<RoleManager<IdentityRole<Guid>>> _mockRoleManager;
    private Mock<IRoleStore<IdentityRole<Guid>>> _mockRoleStore;
    private IUserService _userService;

    [SetUp]
    public void Setup()
    {
        _mockUserStore = new Mock<IUserStore<AppUser>>();
        _mockUserManager = new Mock<UserManager<AppUser>>(_mockUserStore.Object,null,null,null,null,null,null,null,null);
        _mockRoleStore = new Mock<IRoleStore<IdentityRole<Guid>>>();
        _mockRoleManager = new Mock<RoleManager<IdentityRole<Guid>>>(_mockRoleStore.Object,null,null,null,null);
        _userService = new UserService(_mockUserManager.Object,_mockRoleManager.Object);
    }

    #region DeleteUserByIdAsync

    [Test]
    public async Task DeleteUserByIdAsync_ValidUserId_ReturnsSuccessfulDeleteUserResult()
    {
        var appUser = new AppUser();
        _mockUserManager.Setup(service => service.FindByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);
        _mockUserManager.Setup(service => service.DeleteAsync(It.IsAny<AppUser>()))
            .ReturnsAsync(IdentityResult.Success);

        var exceptedResult = DeleteUserResult.Success();
        var result = await _userService.DeleteUserByIdAsync("");
        
        Assert.IsInstanceOf<DeleteUserResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data?.Description, result.Data?.Description);
    }

    [Test]
    public async Task DeleteUserByIdAsync_InvalidUserId_ReturnsNotfoundDeleteUserResult()
    {

        _mockUserManager.Setup(service => service.FindByIdAsync(It.IsAny<string>()))!
            .ReturnsAsync((AppUser)null!);

        var exceptedResult = DeleteUserResult.UserNotFound();
        var result = await _userService.DeleteUserByIdAsync("");
        
        Assert.IsInstanceOf<DeleteUserResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data?.Description, result.Data?.Description);
    }

    [Test]
    public async Task DeleteUserByIdAsync_ServerError_ThrowsException()
    {
        _mockUserManager.Setup(service => service.FindByIdAsync(It.IsAny<string>()))
            .Throws<Exception>();

        var exception = Assert.ThrowsAsync<Exception>(async () => await _userService.DeleteUserByIdAsync("1"));
        
        Assert.AreEqual("An error occured on the server", exception!.Message);
    }

    [Test]
    public async Task DeleteUserByIdAsync_CouldNotDeleteUserDueServerError_ReturnsServerErrorDeleteResult()
    {
        var appUser = new AppUser();
        _mockUserManager.Setup(service => service.FindByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(appUser);
        _mockUserManager.Setup(service => service.DeleteAsync(It.IsAny<AppUser>()))
            .ReturnsAsync(IdentityResult.Failed());

        var exceptedResult = DeleteUserResult.ServerError();
        var result = await _userService.DeleteUserByIdAsync("");
        
        Assert.IsInstanceOf<DeleteUserResult>(result);
        Assert.AreEqual(exceptedResult.Succeeded,result.Succeeded);
        Assert.AreEqual(exceptedResult.Data?.Description,result.Data?.Description);
        Assert.AreEqual(exceptedResult.Data?.ErrorType,result.Data?.ErrorType);
    }
    

    #endregion

    #region GetUsersAsync

    [Test]
    public async Task GetUsersAsync_ReturnsGetUserResult()
    {
        var user1Id = Guid.NewGuid();
        var user2Id = Guid.NewGuid();
        
        var roleId = Guid.NewGuid();
        var userRole = new IdentityRole<Guid>() { Name = "User", Id = roleId };
        var user1 = new AppUser()
        {
            UserName = "user1",
            Id = user1Id,
            Email = "",
            Roles = { new IdentityUserRole<Guid>() { UserId = user1Id, RoleId = roleId } }
        };
        var user2 = new AppUser()
        {
            UserName = "user2",
            Id = user2Id,
            Email = "",
            Roles = { new IdentityUserRole<Guid>() { UserId = user2Id, RoleId = roleId } }
        };

        var users = new List<AppUser> { user1, user2 }.AsQueryable();
        
        var roles = new List<IdentityRole<Guid>>() { userRole }.AsQueryable();

        _mockUserManager.Setup(service => service.Users)
            .Returns(users);
        _mockRoleManager.Setup(service => service.Roles)
            .Returns(roles);
        
        var userDtoList = new List<UserDto>()
        {
            new UserDto() {Email = "", Id = user1Id.ToString(), UserName = "user1", Roles = new List<string>(){ "User" }},
            new UserDto() {Email = "", Id = user2Id.ToString(), UserName = "user2", Roles = new List<string>(){ "User" }}
        };
        var exceptedResult = GetUserResult.Success(userDtoList);
        var result = await _userService.GetUsersAsync();
        
        Assert.IsInstanceOf<GetUserResult>(result);
    }
    

    #endregion
}