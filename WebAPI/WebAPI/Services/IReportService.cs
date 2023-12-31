using WebAPI.Models.RequestDtos.ReportRequestDto;
using WebAPI.Models.ResponseDto.ReportResponseDto;
using WebAPI.Models.ResultModels.ReportResults;

namespace WebAPI.Services;

public interface IReportService
{
    Task<PostReportArticleResult> PostReportArticle(string? userName, PostReportRequestDto postReportRequestDto);
    Task<GetArticleReportsResult> GetPendingArticleReports();
    Task<GetArticleReportsResult> GetActionTakenArticleReports();
    Task<GetArticleReportsResult> GetDismissedArticleReports();
    Task<PatchArticleReportResult> PatchArticleReport(Guid reportId,PatchArticleReportRequestDto patchArticleReportRequestDto);
    Task<GetPendingReportsCountDto> GetPendingArticleReportCount();
}