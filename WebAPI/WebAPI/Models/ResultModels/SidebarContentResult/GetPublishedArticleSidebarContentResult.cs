using WebAPI.Models.ResponseDto.ArticleResponseDto;

namespace WebAPI.Models.ResultModels.SidebarContentResult;

public class GetPublishedArticleSidebarContentResult
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public SidebarContentDto? Data { get; set; }

    public static GetPublishedArticleSidebarContentResult ArticleNotPublished()
    {
        return new GetPublishedArticleSidebarContentResult() { Succeeded = false, Message = "Article not published."};
    }

    public static GetPublishedArticleSidebarContentResult Succeed( SidebarContentDto sidebarContentDto)
    {
        return new GetPublishedArticleSidebarContentResult()
        {
            Succeeded = true, 
            Message = "Sidebar content found", 
            Data = sidebarContentDto
        };
    }
}