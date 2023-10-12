using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

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
    }

    public DbSet<Article> Articles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<ArticleTag> ArticleTags { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
}