using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class FeaturedArticlesDto
{
    public List<ArticleCardDto> ArticleCardDtos = new();
}
