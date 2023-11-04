using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.RequestDtos.ReportRequestDto;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResponseDto.ReportResponseDto;
using WebAPI.Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    
    public ReportController(IReportService reportService, IHttpContextAccessor httpContextAccessor)
    {
        _reportService = reportService;
        _httpContextAccessor = httpContextAccessor;
    }

    [Authorize(Roles = "User")]
    [HttpPost("post-report-article")]
    public async Task<IActionResult> PostArticleReport(PostReportRequestDto postReportRequestDto)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var postReportArticleResult = await _reportService.PostReportArticle(userName, postReportRequestDto);
            if (!postReportArticleResult.Succeeded)
            {
                return BadRequest(new PostReportResponseDto()
                {
                    Description = postReportArticleResult.Message
                });
            }

            return Ok(new PostReportResponseDto()
            {
                Description = postReportArticleResult.Message
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "Admin,Moderator")]
    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingArticleReports()
    {
        try
        {
            var getReportsResult = await _reportService.GetPendingArticleReports();
            return Ok(getReportsResult.ArticleReportResponsesDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "Admin,Moderator")]
    [HttpGet("action-taken")]
    public async Task<IActionResult> GetActionTakenArticleReports()
    {
        try
        {
            var actionTakenReportsResult = await _reportService.GetActionTakenArticleReports();
            return Ok(actionTakenReportsResult.ArticleReportResponsesDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "Admin,Moderator")]
    [HttpGet("dismissed")]
    public async Task<IActionResult> GetDismissedArticleReports()
    {
        try
        {
            var dismissedReportsResult = await _reportService.GetDismissedArticleReports();
            return Ok(dismissedReportsResult.ArticleReportResponsesDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [Authorize(Roles = "Admin,Moderator")]
    [HttpPatch("patch-article-report/{reportId}")]
    public async Task<IActionResult> PatchArticleReport(Guid reportId, PatchArticleReportRequestDto patchArticleReportRequestDto)
    {
        try
        {
            var patchArticleReportResult = await _reportService.PatchArticleReport(reportId,patchArticleReportRequestDto);
            if (!patchArticleReportResult.Succeeded)
            {
                return BadRequest(new PatchArticleReportResponseDto()
                {
                    Message = patchArticleReportResult.Message
                });
            }

            return Ok( new PatchArticleReportResponseDto()
                {
                    Message = patchArticleReportResult.Message
                });
            
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }


}