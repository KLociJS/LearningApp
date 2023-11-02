using WebAPI.Models.Enums;

namespace WebAPI.Models;

public class ArticleReport
{
    public Guid Id { get; set; }
    
    public Guid ReporterId { get; set; }
    public AppUser Reporter { get; set; }
    
    public Guid? ReportedArticleId { get; set; }
    public Article ReportedArticle { get; set; }
    
    public ReportReason Reason { get; set; }
    public string AdditionalComments { get; set; }
    public DateTime CreatedAt { get; set; }
    public ReportStatus Status { get; set; }
}