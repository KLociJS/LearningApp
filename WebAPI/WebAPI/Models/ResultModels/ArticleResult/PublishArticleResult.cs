using WebAPI.Models.RequestDtos.ArticleRequestDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class PublishArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }

    public static PublishArticleResult Succeed()
    {
        return new PublishArticleResult() { Succeeded = true, Message = "Article published." };
    }

    public static PublishArticleResult UserNotFound()
    {
        return new PublishArticleResult() { Succeeded = false, Message = "User not found." };
    }

    public static PublishArticleResult ArticleNotFound()
    {
        return new PublishArticleResult() { Succeeded = false, Message = "Article not found" };
    }
    
}