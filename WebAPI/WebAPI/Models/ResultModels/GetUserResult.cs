using WebAPI.Models.RequestDtos;

namespace WebAPI.Models.ResultModels;

public class GetUserResult
{
    public List<UserDto> Data { get; set; } = new();
}