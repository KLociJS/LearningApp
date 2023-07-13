using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.UserDtos;

public class RegisterUserDto
{
    [EmailAddress(ErrorMessage = "Invalid email format")]
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; } = string.Empty;
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
    [Required(ErrorMessage = "User name is required")]
    public string UserName { get; set; } = string.Empty;
}