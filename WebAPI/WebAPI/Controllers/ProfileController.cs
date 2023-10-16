using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResponseDto.ProfileResponseDto;
using WebAPI.Services;
using WebAPI.Utility;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private IProfileService _profileService;
    private IHttpContextAccessorWrapper _httpContext;

    public ProfileController(IProfileService profileService, IHttpContextAccessorWrapper httpContext)
    {
        _profileService = profileService;
        _httpContext = httpContext;
    }

    [Authorize(Roles = "User")]
    [HttpPost("upload-profile-picture")]
    public async Task<IActionResult> UploadProfilePicture(IFormFile picture)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;
            var uploadPictureResult = await _profileService.UploadProfilePicture(picture, userName);

            if (!uploadPictureResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new UploadProfilePictureResponseDto(){ImageName = uploadPictureResult.ProfilePictureName!});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
    }
}