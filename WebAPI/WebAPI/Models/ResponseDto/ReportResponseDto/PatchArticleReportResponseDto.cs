namespace WebAPI.Models.ResponseDto.ReportResponseDto;

public class PatchArticleReportResponseDto
{
    public string Message { get; set; }
    public ArticleTakeDownNotice? ArticleTakeDownNotice { get; set; }
}