namespace WebAPI.Models;

public class ArticleTag
{
    public Guid Id { get; set; }
    public Article? Article { get; set; }
    public Guid ArticleId { get; set; }
    public Tag? Tag { get; set; }
    public Guid TagId { get; set; }
}