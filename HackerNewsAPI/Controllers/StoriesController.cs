using HackerNewsAPI.Models;
using HackerNewsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HackerNewsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    private readonly IHackerNewsService _service;
    public StoriesController(IHackerNewsService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<HackerNewsItem>> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? query = null)
    {
        return await _service.GetNewStoriesAsync(page, pageSize, query);
    }
}
