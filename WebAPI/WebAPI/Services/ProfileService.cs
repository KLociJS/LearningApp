using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.RequestDtos.ProfileRequestDto;
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

    public async Task<PatchBioResult> PatchBio(PatchBioRequestDto patchBioRequestDto, string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (user == null)
            {
                return PatchBioResult.UserNotFound();
            }

            user.Bio = patchBioRequestDto.BioContent;
            await _context.SaveChangesAsync();
        
            return PatchBioResult.Succeed(user.Bio);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}