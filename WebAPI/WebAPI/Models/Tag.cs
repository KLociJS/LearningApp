namespace WebAPI.Models;

public class Tag
{
    public Guid Id { get; set; }
    public string TagName { get; set; }
    public List<Article> Articles { get; set; }
}