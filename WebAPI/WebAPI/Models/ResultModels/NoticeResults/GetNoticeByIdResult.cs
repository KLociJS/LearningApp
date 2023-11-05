using WebAPI.Models.ResponseDto.NoticeResponseDto;

namespace WebAPI.Models.ResultModels.NoticeResults;

public class GetNoticeByIdResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public NoticeResponseDto? NoticeResponseDto { get; set; }

    public static GetNoticeByIdResult UserNotFound()
    {
        return new GetNoticeByIdResult() { Succeeded = false, Message = "User not found." };
    }

    public static GetNoticeByIdResult NoticeNotFound()
    {
        return new GetNoticeByIdResult() { Succeeded = false, Message = "Notice not found" };
    }

    public static GetNoticeByIdResult Succeed(NoticeResponseDto noticeResponseDto)
    {
        return new GetNoticeByIdResult()
            { Succeeded = true, Message = "Notice found.", NoticeResponseDto = noticeResponseDto };
    }
}