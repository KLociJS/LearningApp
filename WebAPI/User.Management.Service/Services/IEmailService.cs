using User.Management.Service.Models;

namespace User.Management.Service.Services;

public interface IEmailService
{
    SendEmailResult SendEmail(Message message);
    SendEmailResult SendEmailConfirmationLink(string confirmationLink, string[] emails);
}