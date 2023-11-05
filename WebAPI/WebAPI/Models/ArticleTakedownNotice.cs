using WebAPI.Models.Enums;

namespace WebAPI.Models;

public class ArticleTakeDownNotice
{
    public Guid Id { get; set; }
    public AppUser Author { get; set; }
    public Guid AuthorId { get; set; }
    public ReportReason Reason { get; set; }
    public string Details { get; set; }
    public bool Unread { get; set; } = true;
    public bool Deleted { get; set; } = false;
}