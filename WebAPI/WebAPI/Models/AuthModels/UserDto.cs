using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models.UserModels;

public class UserDto
{
    public string? Id { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public IList<string>? Roles { get; set; }
}