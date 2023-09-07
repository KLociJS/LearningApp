namespace WebAPI.Models.ResponseDto;

public class ArticleDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Markdown { get; set; }
    public string Author { get; set; }
    public string? Category { get; set; }
    public string? SubCategory { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}