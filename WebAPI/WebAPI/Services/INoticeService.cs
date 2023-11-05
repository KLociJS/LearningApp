using WebAPI.Models.ResultModels.NoticeResults;

namespace WebAPI.Services;

public interface INoticeService
{
    Task<GetNoticesByUserResult> GetArticleTakeDownNotices(string? userName);
    Task<GetNoticeByIdResult> GetNoticeById(string? userName, Guid id);
    Task<DeleteNoticeResult> DeleteNoticeById(string? userName, Guid id);
    Task<GetUnreadNoticeCountResult> GetUnreadNoticeCount(string? userName);
}