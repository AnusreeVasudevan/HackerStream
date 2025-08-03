using System.Net.Http.Json;
using HackerNewsAPI.Models;
using Microsoft.Extensions.Caching.Memory;

namespace HackerNewsAPI.Services;

public class HackerNewsService : IHackerNewsService
{
    private const string BaseUrl = "https://hacker-news.firebaseio.com/v0/";
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;

    public HackerNewsService(HttpClient httpClient, IMemoryCache cache)
    {
        _httpClient = httpClient;
        _cache = cache;
    }

    public async Task<IEnumerable<HackerNewsItem>> GetNewStoriesAsync(int page, int pageSize, string? query)
    {
        var ids = await _cache.GetOrCreateAsync("newstories", async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
            return await _httpClient.GetFromJsonAsync<List<int>>(BaseUrl + "newstories.json")
                   ?? new List<int>();
        });

        var skip = (page - 1) * pageSize;
        var pageIds = ids.Skip(skip).Take(pageSize * 5); // grab extra for search filtering

        var tasks = pageIds.Select(id => _cache.GetOrCreateAsync($"item-{id}", async e =>
        {
            e.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
            return await _httpClient.GetFromJsonAsync<HackerNewsItem>(BaseUrl + $"item/{id}.json");
        }));
        var items = await Task.WhenAll(tasks);

        var filtered = items.Where(i => i != null && !string.IsNullOrEmpty(i.Url));
        if (!string.IsNullOrWhiteSpace(query))
        {
            filtered = filtered.Where(i => !string.IsNullOrEmpty(i.Title) &&
                                           i.Title.Contains(query, StringComparison.OrdinalIgnoreCase));
        }
        return filtered.Take(pageSize)!;
    }
}
