using WebAPI.Models.RequestDtos;
using WebAPI.Models.RequestDtos.ArticleRequestDto;
using WebAPI.Models.ResponseDto.ArticleResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Models.ResultModels.ArticleResult;
using WebAPI.Models.ResultModels.SidebarContentResult;

namespace WebAPI.Services;

public interface IArticleService
{ 
    Task<PostArticleResult> PostArticle(PostArticleDto postArticleDto, string? userName);
    Task<GetSidebarContentResult> GetSidebarContent(string? userName);
    Task<GetArticleByIdResult> GetArticleById(Guid id, string? userName);
    Task<DeleteArticleResult> DeleteArticle(Guid id, string? userName);
    Task<UpdateArticleResult> UpdateArticle(Guid id, string? userName, UpdateArticleDto updateArticleDto);
    Task<PublishArticleResult> PublishArticle(Guid id, string? userName, PublishArticleDto publishArticleDto);
    Task<List<ArticleCardDto>> GetFeaturedArticles();
    Task<List<ArticleSearchbarResultDto>> SearchArticle(string title);
    Task<GetArticleByIdResult> GetSharedArticleById(Guid id);
    Task<GetPublishedArticleSidebarContentResult> GetSharedArticleSidebarContent(Guid id);

    Task<GetSidebarContentResult>
        UpdateCategory(string? userName, UpdateArticleCategoryDto updateArticleCategoryDto, Guid id);

    Task<UpdatePublishedArticleResult> UpdatePublishedArticle(Guid id, string? userName,
        PublishArticleDto publishArticleDto);

    Task<UnPublishArticleResult> UnPublishArticle(Guid id, string? userName);
}