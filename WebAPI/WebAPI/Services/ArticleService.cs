using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResponseDto.ArticleResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Models.ResultModels.ArticleResult;

namespace WebAPI.Services;

public class ArticleService : IArticleService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDataContext _context;

    public ArticleService(UserManager<AppUser> userManager, AppDataContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<GetArticleByIdResult> GetArticleById(Guid id, string? userName)
    {
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return GetArticleByIdResult.UserNotFound();
        }

        var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id && a.Author == user);
        if (article == null)
        {
            return GetArticleByIdResult.ArticleNotFound();
        }

        var articleDto = new ArticleDto()
        {
            Id = article.Id,
            Title = article.Title,
            Author = article.Author.UserName,
            Markdown = article.Markdown,
            CreatedAt = article.CreatedAt
        };

        if (article.Category != null)
        {
            articleDto.Category = article.Category.Name;
            if (article.SubCategory != null)
            {
                articleDto.SubCategory = article.SubCategory.Name;
            }
        }

        if (article.UpdatedAt != null)
        {
            articleDto.CreatedAt = article.CreatedAt;
        }

        return GetArticleByIdResult.Succeed(articleDto);
    }
    public async Task<DeleteArticleResult> DeleteArticle(Guid id, string? userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return DeleteArticleResult.UserNotFound();
        }

        var articleToDelete = await _context.Articles
            .Include(a=>a.Category)
            .Include(a=>a.SubCategory)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (articleToDelete == null)
        {
            DeleteArticleResult.ArticleNotFound();
        }

        Category? category = null;
        SubCategory? subCategory = null;

        if (articleToDelete!.Category != null)
        {
            category = await _context.Categories.FirstOrDefaultAsync(c => c == articleToDelete.Category);
            if (articleToDelete.SubCategory != null)
            {
                subCategory = await _context.SubCategories.FirstOrDefaultAsync(s => s == articleToDelete.SubCategory);
            }
        }
        
        _context.Articles.Remove(articleToDelete!);

        if (category!=null && category.Articles.Count <= 1)
        {
            _context.Categories.Remove(category);
        }

        if (subCategory != null && subCategory.Articles.Count <= 1)
        {
            _context.SubCategories.Remove(subCategory);
        }

        
        await _context.SaveChangesAsync();
        
        return DeleteArticleResult.Succeed();
    }
    public async Task<GetSidebarContentResult> GetSidebarContent(string? userName)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return GetSidebarContentResult.UserNotFound();
            }
            
            var articlesWithoutCategory = _context.Articles
                .Where(a => a.Category == null && a.Author==user)
                .Select(a=>new SidebarArticleDto(){Name = a.Title, Id = a.Id})
                .ToList();

            var categories = _context.Categories
                .Select(c => new SidebarCategoryDto()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Articles = c.Articles.Where(a=>a.SubCategory==null).Select(a=>new SidebarArticleDto(){Name = a.Title, Id = a.Id}).ToList(),
                    Subcategories = c.SubCategories.Select(s=>new SidebarSubCategoryDto()
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Articles = s.Articles.Select(a=>new SidebarArticleDto(){Name = a.Title, Id = a.Id}).ToList()
                    }).ToList()
                })
                .ToList();
            
            var result = new SidebarContentDto() { Articles = articlesWithoutCategory, Categories = categories };

            return GetSidebarContentResult.Succeed(result);

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<PostArticleResult> PostArticle(PostArticleDto postArticleDto, string? userName)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(userName);
        
        if (user == null)
        {
            return PostArticleResult.UserNotFound();
        }

        var newArticle = new Article()
        {
            Title = postArticleDto.Title,
            Markdown = postArticleDto.Markdown,
            Author = user,
            CreatedAt = DateTime.Now.ToUniversalTime()
        };
        
        if (postArticleDto.Category != null)
        {
            var existingCategory =
                await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == postArticleDto.Category.ToLower());
            
            if (existingCategory == null)
            {
                var newCategory = new Category() { Name = postArticleDto.Category};
                _context.Categories.Add(newCategory);
                newArticle.Category = newCategory;
            }
            else
            {
                newArticle.Category = existingCategory;
            }
            
            if (postArticleDto.SubCategory != null)
            {
                var existingSubCategory =
                    await _context.SubCategories.FirstOrDefaultAsync(sc => sc.Name.ToLower() == postArticleDto.SubCategory.ToLower() && sc.Category == existingCategory);

                if (existingSubCategory == null)
                {
                    var category = newArticle!.Category;
                    if (category != null)
                    {
                        var newSubCategory = new SubCategory() { Name = postArticleDto.SubCategory,  Category = category};
                        _context.SubCategories.Add(newSubCategory);
                        newArticle.SubCategory = newSubCategory;
                    }
                }
                else
                {
                    newArticle.SubCategory = existingSubCategory;
                }
            }
        }


        _context.Articles.Add(newArticle);
        await _context.SaveChangesAsync();

        var articleDto = new ArticleDto()
        {
            Id = newArticle.Id,
            Title = newArticle.Title,
            Markdown = newArticle.Markdown,
            Author = user.UserName,
            CreatedAt = newArticle.CreatedAt
        };
        
        if (newArticle.Category != null)
        {
            articleDto.Category = newArticle.Category.Name;
            if (newArticle.SubCategory != null)
            {
                articleDto.SubCategory = newArticle.SubCategory.Name;
            }
        }
        
        return PostArticleResult.ArticleAdded(articleDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Server error.");
        }
    }
    
}