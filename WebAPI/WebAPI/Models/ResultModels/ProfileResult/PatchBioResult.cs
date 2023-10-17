namespace WebAPI.Models.ResultModels.ProfileResult;

public class PatchBioResult
{
    public bool Succeeded { get; set; }
    public string? Message { get; set; }

    public string? Data { get; set; }

    public static PatchBioResult UserNotFound()
    {
        return new PatchBioResult() { Succeeded = false, Message = "User not found." };
    }

    public static PatchBioResult Succeed(string data)
    {
        return new PatchBioResult() { Succeeded = true, Message = "Bio updated.", Data = data};
    }
}