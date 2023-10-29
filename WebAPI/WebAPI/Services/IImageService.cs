using WebAPI.Models.ResultModels.ImageResult;

namespace WebAPI.Services;

public interface IImageService
{
    public UploadImageResult UploadImage(IFormFile image);
    public DeleteImageResult DeleteImage(string imageFileName);
}