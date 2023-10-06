namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class ArticleSearchbarResultDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }

    public DateTime CreatedAt { get; set; }
    public string Author { get; set; }
}