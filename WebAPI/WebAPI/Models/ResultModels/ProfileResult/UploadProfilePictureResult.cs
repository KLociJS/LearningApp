namespace WebAPI.Models.ResultModels.ProfileResult;

public class UploadProfilePictureResult
{
    public bool Succeeded { get; set; }
    public string? Message { get; set; }
    public string? ProfilePictureName { get; set; }

    public static UploadProfilePictureResult UserNotFound()
    {
        return new UploadProfilePictureResult() { Succeeded = false, Message = "User not found." };
    }
    public static UploadProfilePictureResult FailedToUpload()
    {
        return new UploadProfilePictureResult() { Succeeded = false, Message = "Failed to upload image." };
    }
    
    public static UploadProfilePictureResult Succeed(string profilePictureName)
    {
        return new UploadProfilePictureResult()
        {
            Succeeded = true, 
            Message = "Uploaded the profile picture.", 
            ProfilePictureName = profilePictureName
        };
    }

    public static UploadProfilePictureResult FailedToDeleteOldProfilePicture()
    {
        return new UploadProfilePictureResult() { Succeeded = false, Message = "Couldn't delete old profile picture" };
    }
}