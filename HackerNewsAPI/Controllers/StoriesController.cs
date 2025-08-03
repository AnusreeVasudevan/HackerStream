using HackerNewsAPI.Models;
using HackerNewsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HackerNewsAPI.Controllers;

[ApiController]
[Route("stories")]
public class StoriesController : ControllerBase
{
    private readonly IHackerNewsService _service;
    public StoriesController(IHackerNewsService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<HackerNewsItem>> Get([FromQuery] int page = 1, [FromQuery] int limit = 20, [FromQuery] string? search = null)
    {
        return await _service.GetNewStoriesAsync(page, limit, search);
    }
}
