using Microsoft.EntityFrameworkCore.Storage;
using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class GetArticleByAuthorResult
{
    public bool Succeeded { get; set; }
    public List<ArticleCardDto>? ArticlesDto { get; set; }

    public static GetArticleByAuthorResult AuthorNotFound()
    {
        return new GetArticleByAuthorResult() { Succeeded = false };
    }

    public static GetArticleByAuthorResult Succeed(List<ArticleCardDto> featuredArticlesDto)
    {
        return new GetArticleByAuthorResult() { Succeeded = true, ArticlesDto = featuredArticlesDto };
    }
}