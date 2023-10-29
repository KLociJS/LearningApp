using WebAPI.Models.ResponseDto.ProfileResponseDto;

namespace WebAPI.Models.ResultModels.ProfileResult;

public class GetProfileDataResult
{
    public bool Succeeded { get; set; }
    public GetProfileDataDto? Data { get; set; }

    public static GetProfileDataResult UserNotFound()
    {
        return new GetProfileDataResult() { Succeeded = false };
    }

    public static GetProfileDataResult Succeed(GetProfileDataDto getProfileDataDto)
    {
        return new GetProfileDataResult() { Succeeded = true, Data = getProfileDataDto };
    }

}