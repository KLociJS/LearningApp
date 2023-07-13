namespace WebAPI.Models.ResultDtos;

public class LoginResult
{
    public string Token { get; set; } = string.Empty;
    public bool Succeeded { get; set; }
    public string Description { get; set; } = string.Empty;
    
    public string[]? Roles { get; set; }
    
    private LoginResult(bool succeed)
    {
        Succeeded = succeed;
    }

    public static LoginResult Success(string token)
    {
        return new LoginResult(true) { Token = token, Description = "Successful authentication"};
    }
    
    public static LoginResult Fail()
    {
        return new LoginResult(false) { Description = "Wrong username or password" };
    }

    public static LoginResult ServerError()
    {
        return new LoginResult(false) { Description = "An error occured on the server." };
    }
}