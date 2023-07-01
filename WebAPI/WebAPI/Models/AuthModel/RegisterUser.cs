using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.AuthModel;

public class RegisterUser
{
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
    [Required(ErrorMessage = "User name is required")]
    public string? UserName { get; set; }
    
}