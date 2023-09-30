using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.RequestDtos.ArticleRequestDto;

public class PublishArticleDto
{
    [Required]
    public string Description { get; set; }

    [Required] public List<string> Tags { get; set; }
}