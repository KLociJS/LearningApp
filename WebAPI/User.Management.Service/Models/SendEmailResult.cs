namespace User.Management.Service.Models;

public class SendEmailResult
{
    public bool Succeeded { get; set; }
    public string Description { get; set; } = string.Empty;
    
    public static SendEmailResult Success()
    {
        return new SendEmailResult() { Succeeded = true, Description = "Email sent successfully" };
    }
    public static SendEmailResult Fail()
    {
        return new SendEmailResult() { Succeeded = false, Description = "Could not send email." };
    }
}

