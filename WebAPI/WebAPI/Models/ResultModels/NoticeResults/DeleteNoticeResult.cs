namespace WebAPI.Models.ResultModels.NoticeResults;

public class DeleteNoticeResult
{
    public bool Suceeded { get; set; }
    public string Message { get; set; }

    public static DeleteNoticeResult UserNotFound()
    {
        return new DeleteNoticeResult() { Suceeded = false, Message = "User not found." };
    }

    public static DeleteNoticeResult NoticeNotFound()
    {
        return new DeleteNoticeResult() { Suceeded = false, Message = "Notice not found." };
    }

    public static DeleteNoticeResult Succeed()
    {
        return new DeleteNoticeResult() { Suceeded = true, Message = "Notice deleted." };
    }
}