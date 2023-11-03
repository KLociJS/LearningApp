using WebAPI.Models.Enums;

namespace WebAPI.Models.RequestDtos.ArticleRequestDto;

public class UnPublishArticleByModRequestDto
{
    public ReportReason Reason { get; set; }
    public string Details { get; set; }
}