using WebAPI.Models.Enums;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class RequestPasswordChangeResult
{
    public bool Succeed { get; set; }
    public string Token { get; set; } = string.Empty;
    public Result? Data { get; set; }

    public RequestPasswordChangeResult(bool succeed)
    {
        Succeed = succeed;
    }

    public static RequestPasswordChangeResult Success(string token)
    {
        var result = new Result() { Description = "Email with password change link sent." };
        return new RequestPasswordChangeResult(true) { Data = result, Token = token};
    }

    public static RequestPasswordChangeResult WrongEmail()
    {
        var result = new Result() { Description = "Wrong email." };
        return new RequestPasswordChangeResult(false) { Data = result};
    }
    
    public static RequestPasswordChangeResult ServerError()
    {
        var result = new Result() { Description = "An error occured on the server." };
        return new RequestPasswordChangeResult(false) { Data = result };
    }
}