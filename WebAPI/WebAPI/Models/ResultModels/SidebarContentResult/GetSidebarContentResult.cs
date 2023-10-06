using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels;

public class GetSidebarContentResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public SidebarContentDto? Data { get; set; }

    public static GetSidebarContentResult UserNotFound()
    {
        return new GetSidebarContentResult() { Succeeded = false, Message = "User not found." };
    }
    
    public static GetSidebarContentResult Succeed(SidebarContentDto sidebarContentDto)
    {
        return new GetSidebarContentResult() { Succeeded = true, Message = "Article successfully added.", Data = sidebarContentDto };
    }

    public static GetSidebarContentResult ArticleNotFound()
    {
        return new GetSidebarContentResult() { Succeeded = false, Message = "Article not found." };
    }
}