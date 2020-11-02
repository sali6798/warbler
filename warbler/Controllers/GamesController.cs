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
        public int Post()
        {
            
            var gameId = IdGenerator.GetNextId();
            var game = new Game() { Id = gameId, Player1 = HttpContext.Connection.Id };

            //var entry = _cache.CreateEntry(gameId);
            //entry.Value = game;

            _cache.Set<Game>(gameId, game);

            return gameId;
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
        public void JoinGame(int gameId)
        {
            var game = _cache.Get<Game>(gameId);

            if (game != null && game.Player2 == null)
            {
                game.Player2 = HttpContext.Connection.Id;
                game.HasStarted = true;
                game.currentPlayer = game.Player1;

                _hubContext.Clients.Client(game.currentPlayer).SendAsync("TurnStarted", gameId);
            }
        }

        // DELETE api/<GamesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
