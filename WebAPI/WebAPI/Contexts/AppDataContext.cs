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

        builder.Entity<Article>()
            .HasMany(a => a.Tags)
            .WithMany(t => t.Articles)
            .UsingEntity<ArticleTag>(
                j => j
                    .HasOne(at => at.Tag)
                    .WithMany()
                    .HasForeignKey(at => at.TagId),
                j => j
                    .HasOne(at => at.Article)
                    .WithMany()
                    .HasForeignKey(at => at.ArticleId),
                j =>
                {
                    j.HasKey(at => new { at.ArticleId, at.TagId });
                    j.ToTable("ArticleTags");
                });

    }

    public DbSet<Article> Articles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
}