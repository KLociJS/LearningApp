using WebAPI.Models.ResponseDto.ProfileResponseDto;

namespace WebAPI.Models.ResultModels.ProfileResult;

public class PutGithubUrlResult
{
    public bool Succeeded { get; set; }
    public PutGithubUrlResponseDto? Data { get; set; }

    public static PutGithubUrlResult UserNotFound()
    {
        return new PutGithubUrlResult() { Succeeded = false };
    }

    public static PutGithubUrlResult Succeed(PutGithubUrlResponseDto putGithubUrlResponseDto)
    {
        return new PutGithubUrlResult() { Succeeded = true, Data = putGithubUrlResponseDto};
    }
}