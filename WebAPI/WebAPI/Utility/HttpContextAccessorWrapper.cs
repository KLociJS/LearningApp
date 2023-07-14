namespace WebAPI.Utility;

public class HttpContextAccessorWrapper : IHttpContextAccessorWrapper
{
    public HttpContext HttpContext { get; set; }

    public HttpContextAccessorWrapper(IHttpContextAccessor httpContextAccessor)
    {
        HttpContext = httpContextAccessor.HttpContext!;
    }
}