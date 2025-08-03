using HackerNewsAPI.Models;

namespace HackerNewsAPI.Services;

public interface IHackerNewsService
{
    Task<IEnumerable<HackerNewsItem>> GetNewStoriesAsync(int page, int pageSize, string? query);
}
