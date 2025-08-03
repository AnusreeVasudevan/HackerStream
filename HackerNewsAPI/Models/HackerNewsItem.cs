namespace HackerNewsAPI.Models;

public class HackerNewsItem
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Url { get; set; }
    public int? Score { get; set; }
    public long? Time { get; set; }
}
