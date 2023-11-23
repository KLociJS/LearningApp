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
                return BadRequest(new { uploadPictureResult.Message});
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
    public async Task<IActionResult> PutBio(PutBioRequestDto putBioRequestDto)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;

            var patchBioResult = await _profileService.PutBio(putBioRequestDto, userName);

            if (!patchBioResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new PutBioResponseDto(){Bio = patchBioResult.Message!});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("get-profile-data/{userName}")]
    public async Task<IActionResult> GetProfileData(string userName)
    {
        try
        {
            var getProfileDataResult = await _profileService.GetProfileData(userName);
            if (!getProfileDataResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(getProfileDataResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "User")]
    [HttpPut("update-github-url")]
    public async Task<IActionResult> PutGithubUrl(PutSocialsRequestUrl putGithubUrlRequestDto)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;
            var putGithubUrlResult = await _profileService.PutGithubUrl(putGithubUrlRequestDto, userName);
            if (!putGithubUrlResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(putGithubUrlResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [Authorize(Roles = "User")]
    [HttpPut("update-twitter-url")]
    public async Task<IActionResult> PutTwitterUrl(PutSocialsRequestUrl putTwitterUrlRequestDto)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;
            var putTwitterUrlResult = await _profileService.PutTwitterUrl(putTwitterUrlRequestDto, userName);
            if (!putTwitterUrlResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(putTwitterUrlResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [Authorize(Roles = "User")]
    [HttpPut("update-linkedin-url")]
    public async Task<IActionResult> PutLinkedInUrl(PutSocialsRequestUrl putLinkedInUrlRequestDto)
    {
        try
        {
            var userName = _httpContext.HttpContext.User.Identity!.Name;
            var putLinkedInUrlResult = await _profileService.PutLinkedInUrl(putLinkedInUrlRequestDto, userName);
            if (!putLinkedInUrlResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(putLinkedInUrlResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}