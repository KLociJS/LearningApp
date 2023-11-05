using WebAPI.Models.ResponseDto.NoticeResponseDto;

namespace WebAPI.Models.ResultModels.NoticeResults;

public class GetUnreadNoticeCountResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public GetUnreadNoticeCountDto? GetUnreadNoticeCountDto { get; set; }

    public static GetUnreadNoticeCountResult UserNotFound()
    {
        return new GetUnreadNoticeCountResult() { Succeeded = false, Message = "User not found." };
    }

    public static GetUnreadNoticeCountResult Succeed(GetUnreadNoticeCountDto getUnreadNoticeCountDto)
    {
        return new GetUnreadNoticeCountResult()
        {
            Succeeded = true, Message = "Unread notices count found.", GetUnreadNoticeCountDto = getUnreadNoticeCountDto
        };
    }
}