namespace WebAPI.Models.ResultModels.ArticleResult;

public class UnPublishArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static UnPublishArticleResult UserNotFound()
    {
        return new UnPublishArticleResult() { Succeeded = false, Message = "User not found" };
    }

    public static UnPublishArticleResult ArticleNotFound()
    {
        return new UnPublishArticleResult() { Succeeded = false, Message = "Article not found" };
    }

    public static UnPublishArticleResult Succeed()
    {
        return new UnPublishArticleResult() { Succeeded = true, Message = "Article taken down" };
    }
}