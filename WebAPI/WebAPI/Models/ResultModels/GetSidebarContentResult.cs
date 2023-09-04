using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels;

public class GetSidebarContentResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public SidebarContentDto? Data { get; set; }
}