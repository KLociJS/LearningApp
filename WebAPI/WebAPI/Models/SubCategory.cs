namespace WebAPI.Models;

public class SubCategory
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    
    public Category Category { get; set; }
    public Guid CategoryID { get; set; }
    
    public List<Article> Articles { get; set; }
}