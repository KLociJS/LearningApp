namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class SidebarSubCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<SidebarArticleDto>? Articles { get; set; }
}