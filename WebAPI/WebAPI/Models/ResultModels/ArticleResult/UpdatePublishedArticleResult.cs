namespace WebAPI.Models.ResultModels.ArticleResult;

public class UpdatePublishedArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static UpdatePublishedArticleResult Succeed()
    {
        return new UpdatePublishedArticleResult() { Succeeded = true, Message = "Published article details updated" };
    }

    public static UpdatePublishedArticleResult UserNotFound()
    {
        return new UpdatePublishedArticleResult() { Succeeded = false, Message = "User not found" };
    }

    public static UpdatePublishedArticleResult ArticleNotFound()
    {
        return new UpdatePublishedArticleResult() { Succeeded = false, Message = "Article not found" };
    }
}