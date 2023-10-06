using System.Runtime.Serialization;
using Newtonsoft.Json;
using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels.ArticleResult;

public class FeaturedArticleResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public FeaturedArticlesDto Data { get; set; }

    public static FeaturedArticleResult Succeed(FeaturedArticlesDto featuredArticlesDto)
    {
        return new FeaturedArticleResult()
        {
            Succeeded = true, 
            Message = "Articles found.",
            Data = featuredArticlesDto
        };
    }
}