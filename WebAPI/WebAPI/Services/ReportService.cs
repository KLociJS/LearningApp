using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Models.RequestDtos.ReportRequestDto;
using WebAPI.Models.ResponseDto.ReportResponseDto;
using WebAPI.Models.ResultModels.ReportResults;

namespace WebAPI.Services;

public class ReportService : IReportService
{
    private readonly AppDataContext _context;

    public ReportService(AppDataContext context)
    {
        _context = context;
    }

    public async Task<PostReportArticleResult> PostReportArticle(string? userName, PostReportRequestDto postReportRequestDto)
    {
        try
        {
            var reporterUser = await _context.Users.FirstOrDefaultAsync(u=>u.UserName==userName);

            if (reporterUser == null)
            {
                return PostReportArticleResult.ReporterNotFound();
            }

            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == postReportRequestDto.ReportedArticleId);
            if (article == null)
            {
                return PostReportArticleResult.ArticleNotFound();
            }

            var existingReport =
                await _context.ArticleReports.FirstOrDefaultAsync(r =>
                    r.Reporter == reporterUser && r.ReportedArticle == article);
            
            if (existingReport != null)
            {
                return PostReportArticleResult.ArticleAlreadyReported();
            }

            var report = new ArticleReport()
            {
                AdditionalComments = postReportRequestDto.AdditionalComments,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Reason = postReportRequestDto.Reason,
                ReportedArticle = article,
                Reporter = reporterUser,
                Status = ReportStatus.Pending
            };

            _context.ArticleReports.Add(report);
            await _context.SaveChangesAsync();
        
            return PostReportArticleResult.Succeed();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetArticleReportsResult> GetPendingArticleReports()
    {
        try
        {
            var reports = await _context.ArticleReports
                .Include(r=>r.Reporter)
                .Include(r=>r.ReportedArticle)
                .Where(r=>r.Status==ReportStatus.Pending)
                .ToListAsync();
            
            var reportsDto = reports.Select(r => new ArticleReportResponseDto()
            {
                Id = r.Id,
                AdditionalComments = r.AdditionalComments,
                CreatedAt = r.CreatedAt,
                Reason = r.Reason,
                ReportedArticleId = r.ReportedArticleId,
                ReporterUserName = r.Reporter.UserName
            })
                .ToList();

            return GetArticleReportsResult.Succeed(reportsDto);

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}