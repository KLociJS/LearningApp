using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class UnPublishArticleByModResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static UnPublishArticleByModResult ArticleNotFound()
    {
        return new UnPublishArticleByModResult() { Succeeded = false, Message = "Article not found" };
    }

    public static UnPublishArticleByModResult Succeed()
    {
        return new UnPublishArticleByModResult() { Succeeded = true, Message = "Article taken down." };
    }
}