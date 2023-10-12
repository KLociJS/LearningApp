using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.RequestDtos.ArticleRequestDto;

public class PublishArticleDto
{
    [Required]
    [StringLength(400, MinimumLength = 100, ErrorMessage = "Description must be between 100 and 400 characters.")]
    public string Description { get; set; }

    [Required(ErrorMessage = "At least one tag is required.")]
    [MinLength(1, ErrorMessage = "At least one tag is required.")]
    public List<string> Tags { get; set; }
}