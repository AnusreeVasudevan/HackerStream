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

    public async Task<IEnumerable<HackerNewsItem>> GetNewStoriesAsync(int page, int limit, string? search)
    {
        var ids = await _cache.GetOrCreateAsync("newstories", async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
            try
            {
                return await _httpClient.GetFromJsonAsync<List<int>>(BaseUrl + "newstories.json")
                       ?? new List<int>();
            }
            catch (HttpRequestException)
            {
                return new List<int>();
            }
        });

        var skip = (page - 1) * limit;
        var pageIds = ids.Skip(skip).Take(limit * 5); // grab extra for search filtering

        var tasks = pageIds.Select(id => _cache.GetOrCreateAsync($"item-{id}", async e =>
        {
            e.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
            try
            {
                return await _httpClient.GetFromJsonAsync<HackerNewsItem>(BaseUrl + $"item/{id}.json");
            }
            catch (HttpRequestException)
            {
                return null;
            }
        }));
        var items = await Task.WhenAll(tasks);

        var filtered = items.Where(i => i != null && !string.IsNullOrEmpty(i.Url));
        if (!string.IsNullOrWhiteSpace(search))
        {
            filtered = filtered.Where(i => !string.IsNullOrEmpty(i.Title) &&
                                           i.Title.Contains(search, StringComparison.OrdinalIgnoreCase));
        }
        return filtered.Take(limit)!;
    }
}
