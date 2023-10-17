using MimeKit;
using WebAPI.Models.ResultModels.ImageResult;

namespace WebAPI.Services;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _environment;

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public UploadImageResult UploadImage(IFormFile image)
    {
        try
        {
            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "ProfilePictures");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var extension = image.ContentType.Split("/")[1];
            var allowedExtensions = new string[] { "jpg","png","jpeg" };
            if (!allowedExtensions.Contains(extension))
            {
                return UploadImageResult.WrongExtension();
            }

            var fileName = Guid.NewGuid() + "." + extension;
            var fileWithPath = Path.Combine(path, fileName);
            var stream = new FileStream(fileWithPath, FileMode.Create);
            image.CopyTo(stream);
            stream.Close();

            return UploadImageResult.Succeed(fileName);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public DeleteImageResult DeleteImage(string imageFileName)
    {
        try
        {
            var wwwPath = _environment.ContentRootPath;
            var path = Path.Combine(wwwPath, "ProfilePictures", imageFileName);
            if (File.Exists(path))
            {
                File.Delete(path);
                return DeleteImageResult.Succeed();
            }

            return DeleteImageResult.Failed();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}