using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.RequestDtos;
using WebAPI.Services;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ArticleController : ControllerBase
{
    private readonly IArticleService _articleService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ArticleController(IArticleService articleService, IHttpContextAccessor httpContextAccessor)
    {
        _articleService = articleService;
        _httpContextAccessor = httpContextAccessor;
    }

    [Authorize(Roles = "User")]
    [HttpGet("get-article/{id}")]
    public async Task<IActionResult> GetArticleById(Guid id)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var getArticleResult = await _articleService.GetArticleById(id, userName);

            if (!getArticleResult.Succeeded)
            {
                return BadRequest(new { getArticleResult.Message });
            }

            return Ok(new { getArticleResult.Data, getArticleResult.Message });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [Authorize(Roles = "User")]
    [HttpDelete("delete-article/{id}")]
    public async Task<IActionResult> DeleteArticle(Guid id)
    {
        var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
        
        var deletionResult = await _articleService.DeleteArticle(id, userName);
        
        if (!deletionResult.Succeded)
        {
            return BadRequest(new { deletionResult.Message });
        }

        return Ok(new { deletionResult.Message });
    }

    [Authorize(Roles = "User")]
    [HttpGet("sidebar-content")]
    public async Task<IActionResult> GetSidebarContent()
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var result = await _articleService.GetSidebarContent(userName);

            if (result.Succeeded)
            {
                return Ok(result.Data);
            }

            return Unauthorized(new { result.Message });

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [Authorize(Roles = "User")]
    [HttpPost("add-article")]
    public async Task<IActionResult> PostArticle(PostArticleDto postArticleDto)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var postArticleResult = await _articleService.PostArticle(postArticleDto, userName!);
            
            if (postArticleResult.Succeeded)
            {
                return Ok(postArticleResult.Data);
            }

            return Unauthorized(new { postArticleResult.Message });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }
}