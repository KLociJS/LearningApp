namespace WebAPI.Models.ResultModels.ArticleResult;

public class DeleteArticleResult
{
    public bool Succeded { get; set; }
    public string Message { get; set; }

    public static DeleteArticleResult UserNotFound()
    {
        return new DeleteArticleResult() { Succeded = false, Message = "User not found." };
    }
    public static DeleteArticleResult ArticleNotFound()
    {
        return new DeleteArticleResult() { Succeded = false, Message = "Article not found." };
    }
    
    public static DeleteArticleResult Succeed()
    {
        return new DeleteArticleResult() { Succeded = true, Message = "Article deleted." };
    }
}