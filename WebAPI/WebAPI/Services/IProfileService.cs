using WebAPI.Models.RequestDtos.ProfileRequestDto;
using WebAPI.Models.ResultModels.ProfileResult;

namespace WebAPI.Services;

public interface IProfileService
{ 
    Task<UploadProfilePictureResult> UploadProfilePicture(IFormFile profilePicture, string? userName);
    Task<PutBioResult> PutBio(PutBioRequestDto putBioRequestDto, string? userName);
    Task<GetProfileDataResult> GetProfileData(string userName);
    Task<PutGithubUrlResult> PutGithubUrl(PutGithubUrlRequestDto putGithubUrlRequestDto, string? userName);
    Task<PutTwitterUrlResult> PutTwitterUrl(PutTwitterUrlRequestDto putTwitterUrlRequestDto, string? userName);
    Task<PutLinkedInUrlResult> PutLinkedInUrl(PutLinkedInUrlRequestDto putLinkedInUrlRequestDto, string? userName);
}