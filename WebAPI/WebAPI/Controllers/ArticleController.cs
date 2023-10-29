using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.RequestDtos.ArticleRequestDto;
using WebAPI.Models.ResponseDto;
using WebAPI.Services;

namespace WebAPI.Controllers;

[Authorize(Roles = "User")]
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

    [HttpPut("update-article/{id}")]
    public async Task<IActionResult> UpdateArticle(Guid id, UpdateArticleDto updateArticleDto)
    {
        var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;

        var updateArticleResult = await _articleService.UpdateArticle(id, userName, updateArticleDto);

        if (!updateArticleResult.Succeeded)
        {
            return BadRequest(new { updateArticleResult.Message });
        }

        return Ok(new { updateArticleResult.Data });
    }

    [HttpPost("publish-article/{id}")]
    public async Task<IActionResult> PublishArticle(Guid id, PublishArticleDto publishArticleDto)
    {
        var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;

        var publishArticleResult = await _articleService.PublishArticle(id, userName, publishArticleDto);

        if (!publishArticleResult.Succeeded)
        {
            return BadRequest(new Result() { Description = publishArticleResult.Message });
        }

        return Ok(new Result() { Description = publishArticleResult.Message });
    }
    
    [AllowAnonymous]
    [HttpGet("featured-articles")]
    public async Task<IActionResult> GetFeaturedArticles()
    {
        try
        {
            var getFeaturedArticles = await _articleService.GetFeaturedArticles();
            return Ok( new { Data = getFeaturedArticles });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [AllowAnonymous]
    [HttpPost("search-article")]
    public async Task<IActionResult> SearchArticle(string title)
    {
        try
        {
            var articleSidebarResultDtos = await _articleService.SearchArticle(title);
            return Ok(new { Data = articleSidebarResultDtos });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [AllowAnonymous]
    [HttpGet("shared-article/{id}")]
    public async Task<IActionResult> GetSharedArticleById(Guid id)
    {
        try
        {
            var getSharedArticleResult = await _articleService.GetSharedArticleById(id);
            if (!getSharedArticleResult.Succeeded)
            {
                return NotFound();
            }

            return Ok(getSharedArticleResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [AllowAnonymous]
    [HttpGet("get-shared-article-sidebar-content/{id}")]
    public async Task<IActionResult> GetSharedArticleSidebarContent(Guid id)
    {
        try
        {
            var sidebarContentResult = await _articleService.GetSharedArticleSidebarContent(id);
            if (!sidebarContentResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(sidebarContentResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    
    [HttpPatch("update-category/{id}")]
    public async Task<IActionResult> UpdateCategory(Guid id, UpdateArticleCategoryDto updateArticleCategoryDto)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var updateCategoryResult = await _articleService.UpdateCategory(userName, updateArticleCategoryDto, id);

            if (!updateCategoryResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(updateCategoryResult.Data);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured on the server.");
        }
    }

    [HttpPatch("update-published-article/{id}")]
    public async Task<IActionResult> UpdatePublishedArticle(Guid id, PublishArticleDto publishArticleDto)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;

            var updatePublishedArticleResult =
                await _articleService.UpdatePublishedArticle(id, userName, publishArticleDto);
            if (!updatePublishedArticleResult.Succeeded)
            {
                return BadRequest();
            }
            
            return Ok(new Result(){Description = "Updated."});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured ont he server.");
        }
    }

    [HttpPost("unpublish-article/{id}")]
    public async Task<IActionResult> UnPublishArticle(Guid id)
    {
        try
        {
            var userName = _httpContextAccessor.HttpContext!.User.Identity!.Name;
            var unPublishResult = await _articleService.UnPublishArticle(id,userName);

            if (!unPublishResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new Result() { Description = "Article taken down." });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured ont he server.");
        }
    }

    [HttpGet("get-articles-by-author/{authorName}")]
    public async Task<IActionResult> GetArticleByAuthor(string authorName)
    {
        try
        {
            var getArticleResult = await _articleService.GetArticlesByAuthor(authorName);
            if (!getArticleResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok(getArticleResult.ArticlesDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occured ont he server.");
        }
    }
}