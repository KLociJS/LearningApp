using WebAPI.Models.ResponseDto.ProfileResponseDto;

namespace WebAPI.Models.ResultModels.ProfileResult;

public class PutSocialsUrlResult
{
    public bool Succeeded { get; set; }
    public UrlResponseDto? Data { get; set; }

    public static PutSocialsUrlResult UserNotFound()
    {
        return new PutSocialsUrlResult() { Succeeded = false };
    }

    public static PutSocialsUrlResult Succeed(UrlResponseDto putGithubUrlResponseDto)
    {
        return new PutSocialsUrlResult() { Succeeded = true, Data = putGithubUrlResponseDto};
    }
}