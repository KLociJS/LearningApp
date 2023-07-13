using WebAPI.Models.Enums;

namespace WebAPI.Models.ResultDtos;

public class ChangeForgotPasswordResult
{
    public bool Succeed { get; set; }
    public string Description { get; set; } = string.Empty;
    public ErrorType? ErrorType { get; set; }

    public ChangeForgotPasswordResult(bool succeed)
    {
        Succeed = succeed;
    }

    public static ChangeForgotPasswordResult Success()
    {
        return new ChangeForgotPasswordResult(true) { Description = "Password successfully changed." };
    }

    public static ChangeForgotPasswordResult InvalidInput()
    {
        return new ChangeForgotPasswordResult(false) { Description = "Invalid credentials", ErrorType = Enums.ErrorType.Input};
    }

    public static ChangeForgotPasswordResult ServerError()
    {
        return new ChangeForgotPasswordResult(false) { Description = "An error occured on the server.", ErrorType = Enums.ErrorType.Server};
    }
}