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
                    r.Reporter == reporterUser 
                    && r.ReportedArticle == article 
                    && r.Status== ReportStatus.Pending 
                    && r.Reason==postReportRequestDto.Reason);

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
            var pendingReportsDto = await GetArticleReportsDtoByStatus(ReportStatus.Pending);
            return GetArticleReportsResult.Succeed(pendingReportsDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetArticleReportsResult> GetActionTakenArticleReports()
    {
        try
        {
            var actionTakenReports = await GetArticleReportsDtoByStatus(ReportStatus.ActionTaken);
            return GetArticleReportsResult.Succeed(actionTakenReports);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetArticleReportsResult> GetDismissedArticleReports()
    {
        try
        {
            var dismissedReports = await GetArticleReportsDtoByStatus(ReportStatus.Dismissed);
            return GetArticleReportsResult.Succeed(dismissedReports);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    private async Task<List<ArticleReportResponseDto>> GetArticleReportsDtoByStatus(ReportStatus status)
    {
        var reports = await _context.ArticleReports
            .Include(r=>r.Reporter)
            .Include(r=>r.ReportedArticle)
            .Where(r=>r.Status==status)
            .ToListAsync();
            
        var reportsDto = reports.Select(r => new ArticleReportResponseDto()
            {
                Id = r.Id,
                AdditionalComments = r.AdditionalComments,
                CreatedAt = r.CreatedAt,
                Reason = r.Reason,
                ReportedArticleId = r.ReportedArticleId,
                ReportedArticleTitle = r.ReportedArticle.Title,
                ReporterUserName = r.Reporter.UserName
            })
            .ToList();

        return reportsDto;
    }
    public async Task<PatchArticleReportResult> PatchArticleReport(Guid reportId,PatchArticleReportRequestDto patchArticleReportRequestDto)
    {
        try
        {
            var articleReport =
                await _context.ArticleReports
                    .Include(ar=>ar.Reporter)
                    .Include(ar=>ar.ReportedArticle)
                        .ThenInclude(a=>a.Author)
                    .Include(ar=>ar.ReportedArticle)
                        .ThenInclude(a=>a.ArticleTags)
                    .FirstOrDefaultAsync(ar => ar.Id == reportId);
            
            if (articleReport == null)
            {
                return PatchArticleReportResult.ReportNotFound();
            }

            var existingReports = await _context.ArticleReports.Where(ar =>
                ar.ReportedArticleId == articleReport.ReportedArticle.Id &&
                ar.Reason == articleReport.Reason)
                .ToListAsync();
            
            existingReports.ForEach(ar=>ar.Status=patchArticleReportRequestDto.Status);

            if (patchArticleReportRequestDto.Status == ReportStatus.ActionTaken)
            {
                var articleTakeDownNotice = new ArticleTakeDownNotice()
                {
                    Reason = articleReport.Reason, 
                    Details = patchArticleReportRequestDto.Details,
                    Author = articleReport.ReportedArticle.Author,
                    AuthorId = articleReport.ReportedArticle.AuthorId
                };
                _context.ArticleTakeDownNotices.Add(articleTakeDownNotice);
                
                articleReport.ReportedArticle.Published = false;
                var articleTags = articleReport.ReportedArticle.ArticleTags;
                _context.ArticleTags.RemoveRange(articleTags);
                
                await _context.SaveChangesAsync();

                await RemoveUnusedTags();
                await _context.SaveChangesAsync();

                return PatchArticleReportResult.ArticleTakenDown();
            }

            await _context.SaveChangesAsync();
            
            return PatchArticleReportResult.ReportDismissed();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    private async Task RemoveUnusedTags()
    {
        var unusedTags = await _context.Tags
            .Include(t => t.ArticleTags)
            .Where(t => !t.ArticleTags.Any())
            .ToListAsync();
        foreach (var unusedTag in unusedTags)
        {
            _context.Tags.Remove(unusedTag);
        }
    }
    public async Task<GetPendingReportsCountDto> GetPendingArticleReportCount()
    {
        try
        {
            var pendingReportsCount = await _context.ArticleReports
                .Where(ar => ar.Status == ReportStatus.Pending)
                .CountAsync();

            return new GetPendingReportsCountDto() { Count = pendingReportsCount };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}