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

    [HttpGet]
    public async Task<IActionResult> GetSidebarContent()
    {
        var result = await _articleService.GetSidebarContent();
        return Ok(result.Data);
    }

    [Authorize(Roles = "User")]
    [HttpPost]
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

            return BadRequest(new { postArticleResult.Message });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }
}