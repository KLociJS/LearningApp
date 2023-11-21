using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models.ResponseDto.NoticeResponseDto;
using WebAPI.Models.ResultModels.NoticeResults;

namespace WebAPI.Services;

public class NoticeService : INoticeService
{
    private readonly AppDataContext _context;

    public NoticeService(AppDataContext context)
    {
        _context = context;
    }

    public async Task<GetNoticesByUserResult> GetArticleTakeDownNotices(string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return GetNoticesByUserResult.UserNotFound();
            }

            var notices = await _context.ArticleTakeDownNotices
                .Include(atn=>atn.Author)
                .Where(atn => atn.Author == user && atn.Deleted==false)
                .ToListAsync();

            var noticesDto = notices.Select(atn => new NoticePreview()
            {
                Sender = "System",
                Subject = "Article taken down",
                NoticeId = atn.Id,
                Unread = atn.Unread
            })
                .ToList();
            
            return GetNoticesByUserResult.Succeed(noticesDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetNoticeByIdResult> GetNoticeById(string? userName, Guid id)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return GetNoticeByIdResult.UserNotFound();
            }

            var notice =
                await _context.ArticleTakeDownNotices.FirstOrDefaultAsync(atn => atn.Author == user && atn.Id == id);
            if (notice == null)
            {
                return GetNoticeByIdResult.NoticeNotFound();
            }

            var noticeResponseDto = new NoticeResponseDto() { Message = notice.Details };
            
            notice.Unread = false;
            await _context.SaveChangesAsync();
            
            return GetNoticeByIdResult.Succeed(noticeResponseDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<DeleteNoticeResult> DeleteNoticeById(string? userName, Guid id)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return DeleteNoticeResult.UserNotFound();
            }

            var notice =
                await _context.ArticleTakeDownNotices.FirstOrDefaultAsync(atn => atn.Author == user && atn.Id == id);
            if (notice == null)
            {
                return DeleteNoticeResult.NoticeNotFound();
            }

            notice.Deleted = true;
            notice.Unread = false;
            await _context.SaveChangesAsync();
            
            return DeleteNoticeResult.Succeed();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetUnreadNoticeCountResult> GetUnreadNoticeCount(string? userName)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                return GetUnreadNoticeCountResult.UserNotFound();
            }

            var unreadNoticesCount = await _context.ArticleTakeDownNotices
                    .Where(atn => atn.Author == user && atn.Unread==true)
                    .CountAsync();

            var unreadNoticesCountDto = new GetUnreadNoticeCountDto() { Count = unreadNoticesCount };
            
            return GetUnreadNoticeCountResult.Succeed(unreadNoticesCountDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

}