using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultModels;
using WebAPI.Models.ResultModels.ArticleResult;

namespace WebAPI.Services;

public interface IArticleService
{ 
    Task<PostArticleResult> PostArticle(PostArticleDto postArticleDto, string? userName);
    Task<GetSidebarContentResult> GetSidebarContent(string? userName);
    Task<GetArticleByIdResult> GetArticleById(Guid id, string? userName);
}