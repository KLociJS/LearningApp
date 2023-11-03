using WebAPI.Models.Enums;

namespace WebAPI.Models.RequestDtos.ReportRequestDto;

public class PatchArticleReportRequestDto
{
    public Guid ReportId { get; set; }
    public ReportStatus Status { get; set; }
    public string Details { get; set; }
}