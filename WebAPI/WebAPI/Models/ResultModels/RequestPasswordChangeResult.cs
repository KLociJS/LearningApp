using WebAPI.Models.Enums;

namespace WebAPI.Models.ResultModels;

public class RequestPasswordChangeResult
{
    public bool Succeed { get; set; }
    public string Description { get; set; } = string.Empty;

    public ErrorType? ErrorType { get; set; }

    public RequestPasswordChangeResult(bool succeed)
    {
        Succeed = succeed;
    }

    public static RequestPasswordChangeResult Success()
    {
        return new RequestPasswordChangeResult(true) { Description = "Email with password change link sent." };
    }

    public static RequestPasswordChangeResult WrongEmail()
    {
        return new RequestPasswordChangeResult(false) { Description = "Wrong email.", ErrorType = Enums.ErrorType.Client};
    }
    
    public static RequestPasswordChangeResult ServerError()
    {
        return new RequestPasswordChangeResult(false) { Description = "An error occured on the server.", ErrorType = Enums.ErrorType.Server};
    }
}