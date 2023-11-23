using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class SearchArticleFullTextResult
{
    public List<ArticleCardDto> ArticleCardDtos { get; set; }

    public static SearchArticleFullTextResult Succeed(List<ArticleCardDto> articleCardDtos)
    {
        return new SearchArticleFullTextResult() { ArticleCardDtos = articleCardDtos };
    }
}