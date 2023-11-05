using WebAPI.Models.ResultModels.NoticeResults;

namespace WebAPI.Services;

public interface INoticeService
{
    Task<GetNoticesByUserResult> GetArticleTakeDownNotices(string? userName);
}