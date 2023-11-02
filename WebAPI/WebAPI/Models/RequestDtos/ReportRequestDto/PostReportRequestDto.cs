using WebAPI.Models.Enums;

namespace WebAPI.Models.RequestDtos.ReportRequestDto;

public class PostReportRequestDto
{
    public Guid ReportedArticleId { get; set; }
    public ReportReason Reason { get; set; }
    public string AdditionalComments { get; set; }
}