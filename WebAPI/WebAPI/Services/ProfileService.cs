using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.RequestDtos.ProfileRequestDto;
using WebAPI.Models.ResponseDto.ProfileResponseDto;
using WebAPI.Models.ResultModels.ProfileResult;

namespace WebAPI.Services;

public class ProfileService : IProfileService
{
    private readonly AppDataContext _context;
    private readonly IImageService _imageService;

    public ProfileService(AppDataContext context, IImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }

    public async Task<UploadProfilePictureResult> UploadProfilePicture(IFormFile profilePicture, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return UploadProfilePictureResult.UserNotFound();
            }

            var uploadImageResult = _imageService.UploadImage(profilePicture);
            if (!uploadImageResult.Succeeded)
            {
                return UploadProfilePictureResult.FailedToUpload();
            }

            user.ProfilePictureName = uploadImageResult.ImageName;
            await _context.SaveChangesAsync();
        
            return UploadProfilePictureResult.Succeed(uploadImageResult.ImageName!);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<PutBioResult> PutBio(PutBioRequestDto putBioRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (user == null)
            {
                return PutBioResult.UserNotFound();
            }

            user.Bio = putBioRequestDto.BioContent;
            await _context.SaveChangesAsync();
        
            return PutBioResult.Succeed(user.Bio);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<GetProfileDataResult> GetProfileData(string userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return GetProfileDataResult.UserNotFound();
            }

            var profileDataDto = new GetProfileDataDto
            {
                UserName = user.UserName,
                ProfilePicture = user.ProfilePictureName,
                Bio = user.Bio,
                GitHubUrl = user.GitHubUrl,
                LinkedInUrl = user.LinkedInUrl,
                TwitterUrl = user.TwitterUrl
            };

            return GetProfileDataResult.Succeed(profileDataDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<PutSocialsUrlResult> PutGithubUrl(PutSocialsRequestUrl putGithubUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutSocialsUrlResult.UserNotFound();
            }
            
            var isUrlValid = IsValidGithubURL(putGithubUrlRequestDto.Url);
            if (!isUrlValid)
            {
                return PutSocialsUrlResult.InvalidUrl();
            }
            
            user.GitHubUrl = putGithubUrlRequestDto.Url;
            await _context.SaveChangesAsync();
            
            var successfulResult = new UrlResponseDto() { Url = user.GitHubUrl };
            
            return PutSocialsUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<PutSocialsUrlResult> PutTwitterUrl(PutSocialsRequestUrl putTwitterUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutSocialsUrlResult.UserNotFound();
            }
            
            var isUrlValid = IsValidTwitterURL(putTwitterUrlRequestDto.Url);
            if (!isUrlValid)
            {
                return PutSocialsUrlResult.InvalidUrl();
            }
            
            user.TwitterUrl = putTwitterUrlRequestDto.Url;
            await _context.SaveChangesAsync();
        
            var successfulResult = new UrlResponseDto() { Url = user.TwitterUrl };
        
            return PutSocialsUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<PutSocialsUrlResult> PutLinkedInUrl(PutSocialsRequestUrl putLinkedInUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutSocialsUrlResult.UserNotFound();
            }

            var isUrlValid = IsValidLinkedInURL(putLinkedInUrlRequestDto.Url);
            if (!isUrlValid)
            {
                return PutSocialsUrlResult.InvalidUrl();
            }

            user.LinkedInUrl = putLinkedInUrlRequestDto.Url;
            await _context.SaveChangesAsync();
        
            var successfulResult = new UrlResponseDto() { Url = user.LinkedInUrl };
        
            return PutSocialsUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    private bool IsValidTwitterURL(string? url)
    {
        var regex = new Regex(@"^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}\/?$");
        var urlToTest = url ?? "";
        return regex.IsMatch(urlToTest);
    }

    private bool IsValidGithubURL(string? url)
    {
        var regex = new Regex(@"^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$");
        var urlToTest = url ?? "";
        return regex.IsMatch(urlToTest);
    }

    private bool IsValidLinkedInURL(string? url)
    {
        var regex = new Regex(@"^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$");
        var urlToTest = url ?? "";
        return regex.IsMatch(urlToTest);
    }
}