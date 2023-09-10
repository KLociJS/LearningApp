using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models;

public class AppUser : IdentityUser<Guid>
{
    public List<Article> Articles { get; set; }
    public List<Category> Categories { get; set; }
    public List<SubCategory> SubCategories { get; set; }
    public virtual ICollection<IdentityUserRole<Guid>> Roles { get; } = new List<IdentityUserRole<Guid>>();
    
}