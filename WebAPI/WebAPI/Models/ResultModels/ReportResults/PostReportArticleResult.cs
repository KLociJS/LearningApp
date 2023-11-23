namespace WebAPI.Models.ResultModels.ReportResults;

public class PostReportArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static PostReportArticleResult ReporterNotFound()
    {
        return new PostReportArticleResult() { Succeeded = false, Message = "Reporter user not found." };
    }

    public static PostReportArticleResult ArticleNotFound()
    {
        return new PostReportArticleResult() { Succeeded = false, Message = "Article not found." };
    }

    public static PostReportArticleResult ArticleAlreadyReported()
    {
        return new PostReportArticleResult() { Succeeded = false, Message = "Article already reported." };
    }

public static PostReportArticleResult Succeed()
    {
        return new PostReportArticleResult() { Succeeded = true, Message = "Article report saved." };
    }
}