using WebAPI.Models.Enums;

namespace WebAPI.Models.ResponseDto.ReportResponseDto;

public class ArticleReportResponseDto
{
    public Guid Id { get; set; }
    public string ReporterUserName { get; set; }
    public string ReportedArticleTitle { get; set; }
    public Guid ReportedArticleId { get; set; }
    public ReportReason Reason { get; set; }
    public string? AdditionalComments { get; set; }
    public DateTime CreatedAt { get; set; }
}