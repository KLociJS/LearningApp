namespace WebAPI.Models.ResultModels.ProfileResult;

public class PutBioResult
{
    public bool Succeeded { get; set; }
    public string? Message { get; set; }

    public string? Data { get; set; }

    public static PutBioResult UserNotFound()
    {
        return new PutBioResult() { Succeeded = false, Message = "User not found." };
    }

    public static PutBioResult Succeed(string data)
    {
        return new PutBioResult() { Succeeded = true, Message = "Bio updated.", Data = data};
    }
}