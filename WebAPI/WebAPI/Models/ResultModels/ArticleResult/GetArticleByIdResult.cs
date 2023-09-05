using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class GetArticleByIdResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    
    public ArticleDto? Data { get; set; }

    public static GetArticleByIdResult UserNotFound()
    {
        return new GetArticleByIdResult() { Succeeded = false, Message = "User not found." };
    }
    
    public static GetArticleByIdResult ArticleNotFound()
    {
        return new GetArticleByIdResult() { Succeeded = false, Message = "Article not found." };
    }

    public static GetArticleByIdResult Succeed(ArticleDto articleDto)
    {
        return new GetArticleByIdResult() { Succeeded = true, Message = "Article found.", Data = articleDto };
    }
}