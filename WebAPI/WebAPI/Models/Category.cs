namespace WebAPI.Models;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<SubCategory> SubCategories { get; set; }
    public List<Article> Articles { get; set; }
}