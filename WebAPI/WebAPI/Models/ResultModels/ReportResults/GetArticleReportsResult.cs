using WebAPI.Models.ResponseDto.ReportResponseDto;

namespace WebAPI.Models.ResultModels.ReportResults;

public class GetArticleReportsResult
{
    public List<ArticleReportResponseDto> ArticleReportResponsesDto { get; set; } = new();

    public static GetArticleReportsResult Succeed(List<ArticleReportResponseDto> articleReportResponsesDto)
    {
        return new GetArticleReportsResult() { ArticleReportResponsesDto = articleReportResponsesDto };
    }
}