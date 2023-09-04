using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class PostArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; } = string.Empty;
    
    public ArticleDto? Data { get; set; }

    public static PostArticleResult UserNotFound()
    {
        return new PostArticleResult() { Succeeded = false, Message = "User not found."};
    }

    public static PostArticleResult ArticleAdded(ArticleDto articleDto)
    {
        return new PostArticleResult() { Succeeded = true, Message = "Article added successfully", Data = articleDto };
    }
}