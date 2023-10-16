using MailKit.Net.Smtp;
using MimeKit;
using User.Management.Service.Models;

namespace User.Management.Service.Services;

public class EmailService : IEmailService
{
    public SendEmailResult SendEmail(Message message)
    {
        try
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
            return SendEmailResult.Success();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public SendEmailResult SendEmailConfirmationLink(string confirmationLink, string[] emails)
    {
        try
        {
            var message = new Message(emails, "Email validation", confirmationLink);
            SendEmail(message);
            return SendEmailResult.Success();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private MimeMessage CreateEmailMessage(Message message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("email",Environment.GetEnvironmentVariable("EMAIL_FROM")));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };

        return emailMessage;
    }

    private void Send(MimeMessage mailMessage)
    {
        using var client = new SmtpClient();
        try
        {
            client.Connect(Environment.GetEnvironmentVariable("SMTP_SERVER"), Int32.Parse(Environment.GetEnvironmentVariable("EMAIL_PORT")!), true);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            client.Authenticate(Environment.GetEnvironmentVariable("SMTP_USER_NAME"), Environment.GetEnvironmentVariable("SMTP_PASSWORD"));

            client.Send(mailMessage);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        finally
        {
            client.Disconnect(true);
            client.Dispose();
        }
    }
}