using WebAPI.Models.ResponseDto.ProfileResponseDto;

namespace WebAPI.Models.ResultModels.ProfileResult;

public class PutLinkedInUrlResult
{
    public bool Succeeded { get; set; }
    public PutLinkedInUrlResponseDto? Data { get; set; }

    public static PutLinkedInUrlResult UserNotFound()
    {
        return new PutLinkedInUrlResult() { Succeeded = false };
    }

    public static PutLinkedInUrlResult Succeed(PutLinkedInUrlResponseDto putLinkedInUrlResponseDto)
    {
        return new PutLinkedInUrlResult() { Succeeded = true, Data = putLinkedInUrlResponseDto};
    }
}