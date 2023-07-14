namespace WebAPI.Utility;

public interface IHttpContextAccessorWrapper
{
    HttpContext HttpContext { get; set; }
}