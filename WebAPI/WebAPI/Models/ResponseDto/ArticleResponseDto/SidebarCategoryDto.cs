namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class SidebarCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<SidebarArticleDto>? Articles { get; set; }
    public List<SidebarSubCategoryDto> Subcategories { get; set; }
}