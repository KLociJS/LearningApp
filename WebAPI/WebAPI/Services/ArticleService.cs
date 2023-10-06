using MailKit.Search;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Models;
using WebAPI.Models.RequestDtos;
using WebAPI.Models.RequestDtos.ArticleRequestDto;
using WebAPI.Models.ResponseDto;
using WebAPI.Models.ResponseDto.ArticleResponseDto;
using WebAPI.Models.ResultModels;
using WebAPI.Models.ResultModels.ArticleResult;
using WebAPI.Models.ResultModels.SidebarContentResult;

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

        var article = await _context.Articles
            .Include(a=>a.SubCategory)
            .Include(a=>a.Category)
            .FirstOrDefaultAsync(a => a.Id == id && a.Author == user);
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
            CreatedAt = article.CreatedAt,
            IsPublished = article.Published
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
            .Include(a=>a.Category!.Articles)
            .Include(a=>a.SubCategory!.Articles)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (articleToDelete == null)
        {
            DeleteArticleResult.ArticleNotFound();
        }

        Category? category = null;
        SubCategory? subCategory = null;

        if (articleToDelete!.Category != null)
        {
            category = await _context.Categories
                .Include(c=>c.Articles)
                .FirstOrDefaultAsync(c => c == articleToDelete.Category);
            if (articleToDelete.SubCategory != null)
            {
                subCategory = await _context.SubCategories
                    .Include(sc=>sc.Articles)
                    .FirstOrDefaultAsync(s => s == articleToDelete.SubCategory);
            }
        }
        
        _context.Articles.Remove(articleToDelete!);

        await RemoveEmptyCategories(category, subCategory);

        await _context.SaveChangesAsync();
        
        
        return DeleteArticleResult.Succeed();
    }

    private async Task RemoveEmptyCategories(Category? category, SubCategory? subCategory)
    {
        if (category!=null && category.Articles.Count <= 1)
        {
            _context.Categories.Remove(category);
        }

        if (subCategory != null && subCategory.Articles.Count <= 1)
        {
            _context.SubCategories.Remove(subCategory);
        }
        
        await _context.SaveChangesAsync();
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

            var sidebarContentDto = await GetSidebarContentDto(user);

            return GetSidebarContentResult.Succeed(sidebarContentDto);

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<GetSidebarContentResult> UpdateCategory(string? userName, UpdateArticleCategoryDto updateArticleCategoryDto, Guid id)
    {
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return GetSidebarContentResult.UserNotFound();
        }

        var article = await _context.Articles
            .Include(a=>a.Category)
            .Include(a=>a.SubCategory)
            .Include(a=>a.Author)
            .FirstOrDefaultAsync(a => a.Id == id && a.Author == user);

        if (article == null)
        {
            return GetSidebarContentResult.ArticleNotFound();
        }

        Category? category = null;
        SubCategory? subCategory = null;

        if (article!.Category != null)
        {
            category = await _context.Categories.
                Include(c=>c.Articles)
                .FirstOrDefaultAsync(c => c == article.Category);
            if (article.SubCategory != null)
            {
                subCategory = await _context.SubCategories
                    .Include(sc=>sc.Articles)
                    .FirstOrDefaultAsync(s => s == article.SubCategory);
            }
        }
        
        await CategorizeArticle(article, updateArticleCategoryDto.Category,
            updateArticleCategoryDto.SubCategory, user);
        
        await RemoveEmptyCategories(category, subCategory);

        await _context.SaveChangesAsync();

        var updatedSidebarContent = await GetSidebarContentDto(user);
        
        return GetSidebarContentResult.Succeed(updatedSidebarContent);
    }
    private async Task<SidebarContentDto> GetSidebarContentDto(AppUser user)
    {
        var articlesWithoutCategory = _context.Articles
            .Include(a=>a.Author)
            .Where(a => a.Category == null && a.Author==user)
            .Select(a=>new SidebarArticleDto(){Name = a.Title, Id = a.Id})
            .ToList();

        var categories = _context.Categories
            .Include(c=>c.Author)
            .Where(c=>c.Author==user)
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
            
        return new SidebarContentDto() { Articles = articlesWithoutCategory, Categories = categories };
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

        var updatedArticle = await CategorizeArticle(newArticle, postArticleDto.Category, postArticleDto.SubCategory, user);


        _context.Articles.Add(updatedArticle);
        await _context.SaveChangesAsync();

        var articleDto = new ArticleDto()
        {
            Id = updatedArticle.Id,
            Title = updatedArticle.Title,
            Markdown = updatedArticle.Markdown,
            Author = user.UserName,
            CreatedAt = updatedArticle.CreatedAt
        };
        
        if (updatedArticle.Category != null)
        {
            articleDto.Category = updatedArticle.Category.Name;
            if (updatedArticle.SubCategory != null)
            {
                articleDto.SubCategory = updatedArticle.SubCategory.Name;
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

    private async Task<Article> CategorizeArticle(Article article, string? category, string? subCategory, AppUser user)
    {
        if (category != null)
        {
            var existingCategory =
                await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == category.ToLower() && c.Author == user);
            
            if (existingCategory == null)
            {
                var newCategory = new Category() { Name = category, Author = user};
                _context.Categories.Add(newCategory);
                article.Category = newCategory;
            }
            else
            {
                article.Category = existingCategory;
            }
            
            if (subCategory != null)
            {
                var existingSubCategory =
                    await _context.SubCategories.FirstOrDefaultAsync(sc => 
                        sc.Name.ToLower() == subCategory.ToLower() && 
                        sc.Category == existingCategory && 
                        sc.Author == user);

                if (existingSubCategory == null)
                {
                    if (article.Category != null)
                    {
                        var newSubCategory = new SubCategory() { Name = subCategory,  Category = article.Category, Author = user};
                        _context.SubCategories.Add(newSubCategory);
                        article.SubCategory = newSubCategory;
                    }
                }
                else
                {
                    article.SubCategory = existingSubCategory;
                }
            }
        }

        return article;
    }
    public async Task<UpdateArticleResult> UpdateArticle(Guid id, string? userName, UpdateArticleDto updateArticleDto)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return UpdateArticleResult.UserNotFound();
        }

        var articleToUpdate = await _context.Articles
            .Include(a=>a.SubCategory)
            .Include(a=>a.Category)
            .Include(a=>a.Author)
            .FirstOrDefaultAsync(a => a.Id == id && a.Author==user);
        
        if (articleToUpdate == null)
        {
            return UpdateArticleResult.ArticleNotFound();
        }
        
        articleToUpdate.UpdatedAt = DateTime.Now.ToUniversalTime();
        if (updateArticleDto.Markdown != null)
        {
            articleToUpdate.Markdown = updateArticleDto.Markdown;
        }

        if (updateArticleDto.Title != null)
        {
            articleToUpdate.Title = updateArticleDto.Title;
        }

        await _context.SaveChangesAsync();

        var updatedArticleDto = new ArticleDto()
        {
            Author = user.UserName,
            CreatedAt = articleToUpdate.CreatedAt,
            Id = articleToUpdate.Id,
            Markdown = articleToUpdate.Markdown,
            Title = articleToUpdate.Title,
            UpdatedAt = articleToUpdate.UpdatedAt
        };
        if (articleToUpdate.Category != null)
        {
            updatedArticleDto.Category = articleToUpdate.Category.Name;
        }

        if (articleToUpdate.SubCategory != null)
        {
            updatedArticleDto.SubCategory = articleToUpdate.SubCategory.Name;
        }
        
        return UpdateArticleResult.Succeed(updatedArticleDto);
    }
    public async Task<PublishArticleResult> PublishArticle(Guid id, string? userName, PublishArticleDto publishArticleDto)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return PublishArticleResult.UserNotFound();
        }

        var articleToPublish = await _context.Articles
            .Include(a=>a.Author)
            .FirstOrDefaultAsync(a => a.Id == id && a.Author == user && a.Published!=true);

        if (articleToPublish == null)
        {
            return PublishArticleResult.ArticleNotFound();
        }

        articleToPublish.Published = true;
        articleToPublish.Description = publishArticleDto.Description;
        articleToPublish.Tags = await GetTagsAsync(publishArticleDto.Tags);

        await _context.SaveChangesAsync();

        return PublishArticleResult.Succeed();
    }

    public async Task<UnPublishArticleResult> UnPublishArticle(Guid id, string? userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return UnPublishArticleResult.UserNotFound();
        }

        var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id && a.Author == user);
        if (article == null)
        {
            return UnPublishArticleResult.ArticleNotFound();
        }

        article.Published = false;
        await _context.SaveChangesAsync();
        
        return UnPublishArticleResult.Succeed();
    }

    public async Task<UpdatePublishedArticleResult> UpdatePublishedArticle(Guid id, string? userName,
        PublishArticleDto publishArticleDto)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return UpdatePublishedArticleResult.UserNotFound();
        }

        var article = await _context.Articles.FirstOrDefaultAsync(a => a.Author == user && a.Published == true);

        if (article == null)
        {
            return UpdatePublishedArticleResult.ArticleNotFound();
        }

        article.Description = publishArticleDto.Description;
        article.Tags = await GetTagsAsync(publishArticleDto.Tags);

        await _context.SaveChangesAsync();

        return UpdatePublishedArticleResult.Succeed();
    }
    private async Task<List<Tag>> GetTagsAsync(List<string> tagStrings)
    {
        var tags = new List<Tag>();
        foreach (var tagString in tagStrings)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.TagName.ToLower() == tagString);
            if (tag == null)
            {
                tags.Add(new Tag(){TagName = tagString});
            }
            else
            {
                tags.Add(tag);
            }
        }

        return tags;
    }
    public async Task<List<ArticleCardDto>> GetFeaturedArticles()
    {
        try
        {
            var articles = await _context.Articles
                .Where(a => a.Published == true)
                .Include(a=>a.Author)
                .Include(a=>a.Tags)
                .OrderBy(a => a.CreatedAt)
                .Take(8)
                .ToListAsync();

            var articleDtos = articles.Select(a => new ArticleCardDto()
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description!,
                Author = a.Author.UserName,
                CreatedAt = a.CreatedAt,
                Tags = a.Tags!.Select(t=>t.TagName).ToList()
            })
                .ToList();
            
            return articleDtos;

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<List<ArticleSearchbarResultDto>> SearchArticle(string title)
    {
        try
        {
            var articleSidebarResultDtos = await _context.Articles
                .Include(a=>a.Author)
                .Where(a => a.Title.ToLower().Contains(title.ToLower()) && a.Published == true)
                .Take(10)
                .Select(a => new ArticleSearchbarResultDto()
                {
                    Title = a.Title, 
                    Id = a.Id,
                    CreatedAt = a.CreatedAt,
                    Author = a.Author.UserName
                })
                .ToListAsync();
            return articleSidebarResultDtos;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetArticleByIdResult> GetSharedArticleById(Guid id)
    {
        try
        {
            var article = await _context.Articles
                .Include(a=>a.Author)
                .FirstOrDefaultAsync(a => a.Id == id && a.Published == true);

            if (article == null)
            {
                return GetArticleByIdResult.ArticleNotFound();
            }

            var articleDto = new ArticleDto()
            {
                Author = article.Author.UserName,
                CreatedAt = article.CreatedAt,
                Id = article.Id,
                Markdown = article.Markdown,
                Title = article.Title
            };

            if (article.UpdatedAt != null)
            {
                articleDto.UpdatedAt = article.UpdatedAt;
            }
            
            return GetArticleByIdResult.Succeed(articleDto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<GetPublishedArticleSidebarContentResult> GetSharedArticleSidebarContent(Guid id)
    {
        var articleToFind = await _context.Articles
            .Include(a=>a.Category)
            .Include(a=>a.SubCategory)
            .Include(a=>a.SubCategory!.Articles)
            .FirstOrDefaultAsync(a => a.Id == id && a.Published == true);
    
        if (articleToFind == null)
        {
            return GetPublishedArticleSidebarContentResult.ArticleNotPublished();
        }
        
        if (articleToFind.SubCategory == null)
        {
            var sidebarContentDto = new SidebarContentDto()
            {
                Articles = new List<SidebarArticleDto>(),
                Categories = new List<SidebarCategoryDto>()
                {
                    new SidebarCategoryDto()
                    {
                        Articles = articleToFind.Category.Articles
                            .Select(a => new SidebarArticleDto() { Id = a.Id, Name = a.Title }).ToList(),
                        Id = articleToFind.Category.Id,
                        Name = articleToFind.Category.Name,
                        Subcategories = new List<SidebarSubCategoryDto>()
                    }
                }
            };
            
            return GetPublishedArticleSidebarContentResult.Succeed(sidebarContentDto);
        }
        else
        {
            var sidebarContentDto = new SidebarContentDto()
            {
                Articles = new List<SidebarArticleDto>(),
                Categories = new List<SidebarCategoryDto>()
                {
                    new SidebarCategoryDto()
                    {
                        Articles = new List<SidebarArticleDto>(),
                        Id = articleToFind.Category.Id,
                        Name = articleToFind.Category.Name,
                        Subcategories = articleToFind.Category.SubCategories.Select(sc => new SidebarSubCategoryDto()
                        {
                            Id = sc.Id,
                            Name = sc.Name,
                            Articles = sc.Articles
                                .OrderBy(a=>a.Title)
                                .Select(a => new SidebarArticleDto() { Id = a.Id, Name = a.Title })
                                .ToList()
                        }).ToList()
                    }
                }
            };

            return GetPublishedArticleSidebarContentResult.Succeed(sidebarContentDto);
        }
    }
}