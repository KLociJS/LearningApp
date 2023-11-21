using WebAPI.Models.Enums;

namespace WebAPI.Models.RequestDtos.ReportRequestDto;

public class PatchArticleReportRequestDto
{
    public ReportStatus Status { get; set; }
    public string Details { get; set; }
}