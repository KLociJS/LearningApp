using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResponseDto.NoticeResponseDto;
using WebAPI.Services;
using WebAPI.Utility;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User")]
public class NoticeController : ControllerBase
{
    private readonly INoticeService _noticeService;
    private readonly IHttpContextAccessorWrapper _httpContextAccessor;

    public NoticeController(INoticeService noticeService, IHttpContextAccessorWrapper httpContextAccessor)
    {
        _noticeService = noticeService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("get-notices")]
    public async Task<IActionResult> GetNotices()
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext.User.Identity!.Name;
            var getNoticesResult = await _noticeService.GetArticleTakeDownNotices(userName);

            if (!getNoticesResult.Succeeded)
            {
                return BadRequest(new Result() { Description = getNoticesResult.Message });
            }

            return Ok(new NoticePreviewResponseDto(){NoticePreviews = getNoticesResult.Notices});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}