using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class UpdateArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public ArticleDto? Data { get; set; }

    public static UpdateArticleResult UserNotFound()
    {
        return new UpdateArticleResult() { Succeeded = false, Message = "User not found." };
    }
    public static UpdateArticleResult ArticleNotFound()
    {
        return new UpdateArticleResult() { Succeeded = false, Message = "Article not found." };
    }

    public static UpdateArticleResult Succeed(ArticleDto articleDto)
    {
        return new UpdateArticleResult() { Succeeded = true, Message = "Article updated", Data = articleDto };
    }
}