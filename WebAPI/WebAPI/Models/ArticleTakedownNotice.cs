using WebAPI.Models.Enums;

namespace WebAPI.Models;

public class ArticleTakeDownNotice
{
    public AppUser Author { get; set; }
    public Guid AuthorId { get; set; }
    public ReportReason Reason { get; set; }
    public string Details { get; set; }
}