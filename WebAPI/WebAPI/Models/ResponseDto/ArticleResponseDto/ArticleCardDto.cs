namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class ArticleCardDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string> Tags { get; set; }
}