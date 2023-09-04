using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResultModels;

namespace WebAPI.Services;

public interface IArticleService
{ 
    Task<PostArticleResult> PostArticle(PostArticleDto postArticleDto, string userName);
}