using WebAPI.Models.RequestDtos.ProfileRequestDto;
using WebAPI.Models.ResultModels.ProfileResult;

namespace WebAPI.Services;

public interface IProfileService
{ 
    Task<UploadProfilePictureResult> UploadProfilePicture(IFormFile profilePicture, string? userName);
    Task<PatchBioResult> PatchBio(PatchBioRequestDto patchBioRequestDto, string? userName);
}