using WebAPI.Models.Enums;

namespace WebAPI.Models.ResultDtos;

public class ConfirmEmailResult
{
    public bool Succeeded { get; private set; }
    public Result Data { get; private set; }

    public ConfirmEmailResult(bool isSuccess, Result data)
    {
        Succeeded = isSuccess;
        Data = data;
    }

    public static ConfirmEmailResult Success()
    {
        var result = new Result() { Description = "Email verified successfully." };
        return new ConfirmEmailResult(true, result);
    }

    public static ConfirmEmailResult InvalidInput()
    {
        var result = new Result() { ErrorType = ErrorType.Client ,Description = "Wrong email." };
        return new ConfirmEmailResult(false, result);
    }

    public static ConfirmEmailResult ServerError()
    {
        var result = new Result() { ErrorType = ErrorType.Server, Description = "An error occured on the server." };
        return new ConfirmEmailResult(false, result);
    }
}