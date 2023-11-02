using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.Enums;

namespace WebAPI.Contexts;

public class AppDataContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<AppUser>()
            .HasMany(e => e.Roles)
            .WithOne()
            .HasForeignKey(e => e.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ArticleTag>()
            .HasOne(a => a.Article)
            .WithMany(at => at.ArticleTags)
            .HasForeignKey(at => at.ArticleId);

        builder.Entity<ArticleTag>()
            .HasOne(at => at.Tag)
            .WithMany(t => t.ArticleTags)
            .HasForeignKey(at => at.TagId);
        
        builder.Entity<Article>()
            .HasGeneratedTsVectorColumn(
                a => a.SearchVector,
                "english",  
                a => new { a.Title, a.Description, a.Markdown })  
            .HasIndex(a => a.SearchVector)
            .HasMethod("GIN");
        
        builder.Entity<ArticleReport>()
            .Property(e => e.Reason)
            .HasConversion(
                v => v.ToString(),
                v => (ReportReason)Enum.Parse(typeof(ReportReason), v));
        builder.Entity<ArticleReport>()
            .Property(e => e.Status)
            .HasConversion(
                v => v.ToString(),
                v => (ReportStatus)Enum.Parse(typeof(ReportStatus), v));
    }

    public DbSet<Article> Articles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<ArticleTag> ArticleTags { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    
    public DbSet<ArticleReport> ArticleReports { get; set; }
}