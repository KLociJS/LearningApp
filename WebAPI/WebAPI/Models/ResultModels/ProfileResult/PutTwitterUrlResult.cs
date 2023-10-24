using WebAPI.Models.ResponseDto.ProfileResponseDto;

namespace WebAPI.Models.ResultModels.ProfileResult;

public class PutTwitterUrlResult
{
    public bool Succeeded { get; set; }
    public PutTwitterUrlResponseDto? Data { get; set; }

    public static PutTwitterUrlResult UserNotFound()
    {
        return new PutTwitterUrlResult() { Succeeded = false };
    }

    public static PutTwitterUrlResult Succeed(PutTwitterUrlResponseDto putTwitterUrlResponseDto)
    {
        return new PutTwitterUrlResult() { Succeeded = true, Data = putTwitterUrlResponseDto};
    }
}