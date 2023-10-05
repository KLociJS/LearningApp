using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.RequestDtos;

public class EmailDto
{
    [EmailAddress(ErrorMessage = "Invalid email format")]
    [Required(ErrorMessage = "Email is required")]
    public string? Address { get; set; }
}