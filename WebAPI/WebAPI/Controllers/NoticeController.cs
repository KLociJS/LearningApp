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

    [HttpGet("get-notice/{id}")]
    public async Task<IActionResult> GetNoticeById(Guid id)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext.User.Identity!.Name;
            var getNoticeResult = await _noticeService.GetNoticeById(userName, id);
            if (!getNoticeResult.Succeeded)
            {
                return BadRequest(getNoticeResult.Message);
            }

            return Ok(getNoticeResult.NoticeResponseDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpDelete("delete-notice/{id}")]
    public async Task<IActionResult> DeleteNoticeById(Guid id)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext.User.Identity!.Name;
            var deleteNoticeResult = await _noticeService.DeleteNoticeById(userName, id);
            if (!deleteNoticeResult.Suceeded)
            {
                return BadRequest(new Result() {Description = deleteNoticeResult.Message});
            }

            return Ok(new Result() {Description = deleteNoticeResult.Message});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("get-notice-count")]
    public async Task<IActionResult> GetUnReadNoticeCount()
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext.User.Identity!.Name;
            var getUnReadNoticeCountResult = await _noticeService.GetUnreadNoticeCount(userName);
            if (!getUnReadNoticeCountResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(getUnReadNoticeCountResult.GetUnreadNoticeCountDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}