using WebAPI.Models.RequestDtos;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class GetUserResult
{
    public bool Succeeded { get; set; }
    public GetUsersResponseDto Data { get; set; } = new();

    public GetUserResult(bool succeeded)
    {
        Succeeded = succeeded;
    }
    

    public static GetUserResult Success(List<UserDto> userDtos)
    {
        var response = new GetUsersResponseDto()
        {
            UserDtos = userDtos,
            Description = "Users found."
        };
        
        return new GetUserResult(true) { Data = response };
    }
    
    public static GetUserResult NotFound()
    {
        var response = new GetUsersResponseDto() { Description = "Users not found." };
        
        return new GetUserResult(false) { Data = response };
    }
}