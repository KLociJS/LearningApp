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
}