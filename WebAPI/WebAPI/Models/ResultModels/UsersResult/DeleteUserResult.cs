using WebAPI.Models.Enums;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class DeleteUserResult
{
    public bool Succeeded { get; private set; }
    public Result? Data { get; set; }

    public static DeleteUserResult Success()
    {
        var result = new Result() { Description = "User successfully deleted." };
        return new DeleteUserResult() { Succeeded = true, Data = result};
    }

    public static DeleteUserResult UserNotFound()
    {
        var result = new Result() { Description = "User not found." };
        return new DeleteUserResult() { Succeeded = false, Data = result };
    }
    public static DeleteUserResult ServerError()
    {
        var result = new Result() { Description = "An error occured on the server.", ErrorType = ErrorType.Server};
        return new DeleteUserResult() { Succeeded = false, Data = result };
    }
}