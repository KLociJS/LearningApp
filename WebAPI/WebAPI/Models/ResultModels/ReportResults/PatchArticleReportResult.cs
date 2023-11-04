namespace WebAPI.Models.ResultModels.ReportResults;

public class PatchArticleReportResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static PatchArticleReportResult ReportNotFound()
    {
        return new PatchArticleReportResult() { Succeeded = false, Message = "Report not found." };
    }

    public static PatchArticleReportResult ArticleTakenDown()
    {
        return new PatchArticleReportResult()
            { Succeeded = true, Message = "Article taken down." };
    }

    public static PatchArticleReportResult ReportDismissed()
    {
        return new PatchArticleReportResult() { Succeeded = true, Message = "Report dismissed" };
    }
}