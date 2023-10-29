using WebAPI.Models.RequestDtos.ProfileRequestDto;
using WebAPI.Models.ResultModels.ProfileResult;

namespace WebAPI.Services;

public interface IProfileService
{ 
    Task<UploadProfilePictureResult> UploadProfilePicture(IFormFile profilePicture, string? userName);
    Task<PutBioResult> PutBio(PutBioRequestDto putBioRequestDto, string? userName);
    Task<GetProfileDataResult> GetProfileData(string userName);
    Task<PutSocialsUrlResult> PutGithubUrl(PutSocialsRequestUrl putGithubUrlRequestDto, string? userName);
    Task<PutSocialsUrlResult> PutTwitterUrl(PutSocialsRequestUrl putTwitterUrlRequestDto, string? userName);
    Task<PutSocialsUrlResult> PutLinkedInUrl(PutSocialsRequestUrl putLinkedInUrlRequestDto, string? userName);
}