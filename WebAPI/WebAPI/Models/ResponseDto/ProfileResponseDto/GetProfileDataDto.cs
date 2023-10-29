namespace WebAPI.Models.ResponseDto.ProfileResponseDto;

public class GetProfileDataDto
{
    public string UserName { get; set; }
    public string? ProfilePicture { get; set; }
    public string? Bio { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? TwitterUrl { get; set; }
}