using System.Drawing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.RequestDtos.ProfileRequestDto;
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

    [Authorize(Roles = "User")]
    [HttpPatch("update-bio")]
    public async Task<IActionResult> PatchBio(PatchBioRequestDto patchBioRequestDto)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;

            var patchBioResult = await _profileService.PatchBio(patchBioRequestDto, userName);

            if (!patchBioResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new PathBioResponseDto(){Bio = patchBioResult.Message!});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}