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
}