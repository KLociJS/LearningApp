using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models;

public class AppUser : IdentityUser<Guid>
{
    public List<Article> Articles { get; set; }
    public string RefreshToken { get; set; }
}