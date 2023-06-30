namespace WebAPI.Models;

public class SubCategory
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Article> Articles { get; set; }
}