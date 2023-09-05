namespace WebAPI.Models.RequestDtos;

public class PostArticleDto
{
        public string Title { get; set; }
        public string Markdown { get; set; }
        public string? Category { get; set; }
        public string? SubCategory { get; set; }
}