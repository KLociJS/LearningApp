using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using NpgsqlTypes;

namespace WebAPI.Models;

public class Article
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Markdown { get; set; }
    
    public AppUser Author { get; set; }
    public Guid AuthorId { get; set; }
    
    public Category Category { get; set; }
    public Guid CategoryId { get; set; }
    
    public SubCategory? SubCategory { get; set; }
    public Guid? SubCategoryId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public bool? Published { get; set; }
    public string? Description { get; set; }
    public List<ArticleTag> ArticleTags { get; set; } = new();
    
    public NpgsqlTsVector SearchVector { get; set; }
}