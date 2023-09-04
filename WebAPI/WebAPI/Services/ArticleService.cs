using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResultModels;

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


    public async Task<PostArticleResult> PostArticle(PostArticleDto postArticleDto, string userName)
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