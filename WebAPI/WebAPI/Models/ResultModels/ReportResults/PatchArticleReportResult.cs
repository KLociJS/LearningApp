namespace WebAPI.Models.ResultModels.ReportResults;

public class PatchArticleReportResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public ArticleTakeDownNotice? ArticleTakeDownNotice { get; set; }

    public static PatchArticleReportResult ReportNotFound()
    {
        return new PatchArticleReportResult() { Succeeded = false, Message = "Report not found." };
    }

    public static PatchArticleReportResult ArticleTakenDown(ArticleTakeDownNotice articleTakeDownNotice)
    {
        return new PatchArticleReportResult()
            { Succeeded = true, Message = "Article taken down.", ArticleTakeDownNotice = articleTakeDownNotice };
    }

    public static PatchArticleReportResult ReportDismissed()
    {
        return new PatchArticleReportResult() { Succeeded = true, Message = "Report dismissed" };
    }
}