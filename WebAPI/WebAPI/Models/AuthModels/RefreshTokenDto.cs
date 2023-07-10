namespace WebAPI.Models.UserModels;

public class RefreshTokenDto
{
    public string? UserName { get; set; }
    public string? RefreshToken { get; set; }
}