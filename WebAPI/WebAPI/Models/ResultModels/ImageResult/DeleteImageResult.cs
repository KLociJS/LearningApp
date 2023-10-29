namespace WebAPI.Models.ResultModels.ImageResult;

public class DeleteImageResult
{
    public bool Succeeded { get; set; }
    public string? Message { get; set; }

    public static DeleteImageResult Succeed()
    {
        return new DeleteImageResult() { Succeeded = true, Message = "Image deleted." };
    }

    public static DeleteImageResult Failed()
    {
        return new DeleteImageResult() { Succeeded = false, Message = "Couldn't delete image." };
    }
}