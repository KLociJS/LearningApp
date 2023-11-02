using WebAPI.Models.RequestDtos.ReportRequestDto;
using WebAPI.Models.ResultModels.ReportResults;

namespace WebAPI.Services;

public interface IReportService
{
    Task<PostReportArticleResult> PostReportArticle(string? userName, PostReportRequestDto postReportRequestDto);
}