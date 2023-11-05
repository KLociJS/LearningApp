namespace WebAPI.Models.ResponseDto.NoticeResponseDto;

public class NoticePreview
{
    public Guid NoticeId { get; set; }
    public string Sender { get; set; }
    public string Subject { get; set; }
    public bool Unread { get; set; }
}