using WebAPI.Models.Enums;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class ChangeForgotPasswordResult
{
    public bool Succeed { get; set; }
    public Result? Data { get; set; }

    public ChangeForgotPasswordResult(bool succeed)
    {
        Succeed = succeed;
    }

    public static ChangeForgotPasswordResult Success()
    {
        var result = new Result { Description = "Password successfully changed." };
        return new ChangeForgotPasswordResult(true) { Data = result };
    }

    public static ChangeForgotPasswordResult InvalidInput()
    {
        var result = new Result { Description = "Invalid email." };
        return new ChangeForgotPasswordResult(false) { Data = result };
    }

    public static ChangeForgotPasswordResult ServerError()
    {
        var result = new Result { Description = "An error occured on the server." };
        return new ChangeForgotPasswordResult(false) { Data = result };
    }
}