using System.Net;
using System.Net.Http;
using System.Text;
using HackerNewsAPI.Services;
using Microsoft.Extensions.Caching.Memory;
using Xunit;
using System.Threading;
using System.Threading.Tasks;
using HackerNewsAPI.Models;
using System.Linq;

public class HackerNewsServiceTests
{
    [Fact]
    public async Task ReturnsStoriesWithUrl()
    {
        var handler = new FakeHttpHandler();
        var client = new HttpClient(handler);
        var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new HackerNewsService(client, cache);

        var stories = await service.GetNewStoriesAsync(1, 10, null);

        Assert.Single(stories);
        Assert.Equal("Title", stories.First().Title);
    }

    [Fact]
    public async Task FiltersBySearchTerm()
    {
        var handler = new FakeHttpHandler();
        var client = new HttpClient(handler);
        var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new HackerNewsService(client, cache);

        var match = await service.GetNewStoriesAsync(1, 10, "Title");
        Assert.Single(match);

        var none = await service.GetNewStoriesAsync(1, 10, "Missing");
        Assert.Empty(none);
    }

    [Fact]
    public async Task IncludesScoreAndTime()
    {
        var handler = new FakeHttpHandler();
        var client = new HttpClient(handler);
        var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new HackerNewsService(client, cache);

        var stories = await service.GetNewStoriesAsync(1, 10, null);
        var story = stories.First();
        Assert.Equal(10, story.Score);
        Assert.Equal(1234, story.Time);
    }

    [Fact]
    public async Task ReturnsEmptyWhenRequestFails()
    {
        var handler = new ErrorHttpHandler();
        var client = new HttpClient(handler);
        var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new HackerNewsService(client, cache);

        var stories = await service.GetNewStoriesAsync(1, 10, null);

        Assert.Empty(stories);
    }

    [Fact]
    public async Task TreatsNonPositivePageAsFirstPage()
    {
        var handler = new FakeHttpHandler();
        var client = new HttpClient(handler);
        var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new HackerNewsService(client, cache);

        var stories = await service.GetNewStoriesAsync(0, 10, null);

        Assert.Single(stories);
    }
}

class FakeHttpHandler : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var path = request.RequestUri!.AbsolutePath;
        string json = path switch
        {
            "/v0/newstories.json" => "[1]",
            "/v0/item/1.json" => "{\"id\":1,\"title\":\"Title\",\"url\":\"http://example.com\",\"score\":10,\"time\":1234}",
            _ => "{}"
        };

        return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        });
    }
}

class ErrorHttpHandler : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new HttpResponseMessage(HttpStatusCode.InternalServerError));
    }
}
