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

            if (user.ProfilePictureName != null)
            {
                var deleteImageResult = _imageService.DeleteImage(user.ProfilePictureName);
                if (!deleteImageResult.Succeeded)
                {
                    return UploadProfilePictureResult.FailedToDeleteOldProfilePicture();
                }
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

    public async Task<PutGithubUrlResult> PutGithubUrl(PutGithubUrlRequestDto putGithubUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutGithubUrlResult.UserNotFound();
            }

            user.GitHubUrl = putGithubUrlRequestDto.GitHubUrl;
            await _context.SaveChangesAsync();
            
            var successfulResult = new PutGithubUrlResponseDto() { GithubUrl = user.GitHubUrl };
            
            return PutGithubUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<PutTwitterUrlResult> PutTwitterUrl(PutTwitterUrlRequestDto putTwitterUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutTwitterUrlResult.UserNotFound();
            }

            user.TwitterUrl = putTwitterUrlRequestDto.TwitterUrl;
            await _context.SaveChangesAsync();
        
            var successfulResult = new PutTwitterUrlResponseDto() { TwitterUrl = user.TwitterUrl };
        
            return PutTwitterUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public async Task<PutLinkedInUrlResult> PutLinkedInUrl(PutLinkedInUrlRequestDto putLinkedInUrlRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return PutLinkedInUrlResult.UserNotFound();
            }

            user.LinkedInUrl = putLinkedInUrlRequestDto.LinkedInUrl;
            await _context.SaveChangesAsync();
        
            var successfulResult = new PutLinkedInUrlResponseDto() { LinkedInUrl = user.LinkedInUrl };
        
            return PutLinkedInUrlResult.Succeed(successfulResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}