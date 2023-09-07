namespace WebAPI.Models.ResponseDto.ArticleResponseDto;

public class SidebarContentDto
{
    public List<SidebarArticleDto> Articles { get; set; }
    public List<SidebarCategoryDto> Categories { get; set; }
}