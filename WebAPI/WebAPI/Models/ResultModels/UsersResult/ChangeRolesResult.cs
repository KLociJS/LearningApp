using WebAPI.Models.Enums;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class ChangeRolesResult
{
    public bool Succeeded { get; private set; }
    public Result? Data { get; set; }

    public static ChangeRolesResult Success()
    {
        var result = new Result { Description = "User roles changed successfully." };
        return new ChangeRolesResult { Succeeded = true, Data = result};
    }

    public static ChangeRolesResult UserNotFound()
    {
        var result = new Result { Description = "User not found.", ErrorType = ErrorType.UserName};
        return new ChangeRolesResult { Succeeded = false, Data = result };
    }

    public static ChangeRolesResult ServerError()
    {
        var result = new Result { Description = "Could not add roles", ErrorType = ErrorType.Server};
        return new ChangeRolesResult { Succeeded = false, Data = result };
    }
    
}