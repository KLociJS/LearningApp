namespace WebAPI.Models.ResultModels.ImageResult;

public class UploadImageResult
{
    public bool Succeeded { get; set; }
    public string? ImageName { get; set; }
    public string? Message { get; set; }

    public static UploadImageResult WrongExtension()
    {
        return new UploadImageResult() { Succeeded = false, Message = "Wrong file extension." };
    }

    public static UploadImageResult Succeed(string imageName)
    {
        return new UploadImageResult() { Succeeded = true, Message = "Image uploaded.", ImageName = imageName };
    }
}