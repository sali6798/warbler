using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using warbler.Hubs;
using warbler.Models;
using warbler.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace warbler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly IHubContext<ChatHub> _hubContext;

        public GamesController(IMemoryCache memoryacche, IHubContext<ChatHub> hubContext)
        {
            _cache = memoryacche;
            _hubContext = hubContext;
        }

        // GET: api/<GamesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<GamesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GamesController>
        [HttpPost]
        //public void Post([FromBody] string value)
        public async Task<IActionResult> Post()
        {
            
            var gameId = IdGenerator.GetNextId();
            //var game = new Game() { Id = gameId };

            //var entry = _cache.CreateEntry(gameId);
            //entry.Value = game;

            var game = await _cache.GetOrCreateAsync<Game>(gameId, entry => { return Task.FromResult(new Game() { Id = gameId });});

            //_cache.Set<Game>(gameId, game);

            return CreatedAtAction(nameof(Get), new { gameId = game.Id, playerId = 0});
        }

        /*
        // PUT api/<GamesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
        */

        // PUT api/<GamesController>/5
        [HttpPut("{id}")]
        public IActionResult JoinGame(int gameId)
        {
            var game = _cache.Get<Game>(gameId);

            if (game != null && !game.HasStarted)
            {
                //game.HasStarted = true;
                //game.currentPlayer = 1;

                //await _hubContext.Clients.All.SendAsync("TurnStarted", new { gameId = game.Id, currPlayer = game.currentPlayer });

                return CreatedAtAction(nameof(Get), new { gameId = game.Id, playderId = 1 });
            }

            return NotFound();
        }

        // DELETE api/<GamesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int gameId)
        {
            var game = await Task.Run<Game>(() => { return _cache.Get<Game>(gameId); });

            if (game != null)
            {
                _cache.Remove(gameId);

                await _hubContext.Clients.All.SendAsync("GameEnded", new { gameId = game.Id});

                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
