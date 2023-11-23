using WebAPI.Models.ResponseDto.NoticeResponseDto;

namespace WebAPI.Models.ResultModels.NoticeResults;

public class GetNoticesByUserResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public List<NoticePreview> Notices { get; set; } = new();

    public static GetNoticesByUserResult UserNotFound()
    {
        return new GetNoticesByUserResult() { Succeeded = false, Message = "User not found." };
    }

    public static GetNoticesByUserResult Succeed(List<NoticePreview> noticeResponseDto)
    {
        return new GetNoticesByUserResult()
            { Succeeded = true, Message = "Notices found.", Notices = noticeResponseDto };
    }
}