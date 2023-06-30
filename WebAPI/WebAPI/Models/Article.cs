using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;

namespace WebAPI.Models;

public class Article
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    
    public AppUser Author { get; set; }
    public Guid AuthorId { get; set; }

    public Category Category { get; set; }
    public Guid CategoryId { get; set; }

    public SubCategory? SubCategory { get; set; }
    public Guid SubCategoryId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}