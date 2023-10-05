using WebAPI.Models.RequestDtos;

namespace WebAPI.Models.ResponseDto;

public class GetUsersResponseDto
{
    public string Description { get; set; } = string.Empty;
    public List<UserDto> UserDtos { get; set; } = new();
}