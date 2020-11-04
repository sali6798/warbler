using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using warbler.Models;
using warbler.Utils;

namespace warbler.Hubs
{
    public class ChatHub : Hub
    {
        private IMemoryCache _cache;

        public ChatHub(IMemoryCache memoryacche)
        {
            _cache = memoryacche;
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceivedMessage", user, message);
        }

        public async Task InvitePlayers(int gameId)
        {
            var game = _cache.Get<Game>(gameId);
            if (game != null)
            {
                await Clients.All.SendAsync("GameAvailable", gameId);
            }
            else
            {
                throw new ArgumentException("Invalid GameId");
            }
        }

        public async Task<IActionResult> PlayerJoined(int gameId, int playerId)
        {
            var game = _cache.Get<Game>(gameId);
            if (game != null && !game.HasStarted)
            {
                game.CurrentPlayer = 1;
                game.HasStarted = true;
                await Clients.All.SendAsync("GameReady", game.Id, game.CurrentPlayer);
                return new OkResult();
            }
            else
            {
                return new NotFoundResult();
            }
        }

        public async Task<IActionResult> PlayerAction(int gameId, int playerId, List<int> actions)
        {
            var game = _cache.Get<Game>(gameId);
            if (game != null && game.HasStarted)
            {
                var lastPlayer = game.CurrentPlayer;
                game.CurrentPlayer = (lastPlayer + 1) % 2;
                await Clients.All.SendAsync("PlayerAction", game.Id, new { lastPlayer = lastPlayer, currentPlayer = game.CurrentPlayer, actions = actions });
                return new NoContentResult();
            }
            else
            {
                return new NotFoundResult();
            }
        }

        public async Task<IActionResult> GameWon(int gameId, int winnerId)
        {
            var game = _cache.Get<Game>(gameId);
            if (game != null && game.HasStarted)
            {
                game.HasStarted = false;
                game.CurrentPlayer = winnerId;
                await Clients.All.SendAsync("GameWon", game.Id, winnerId);
                return new NoContentResult();
            }
            else
            {
                return new NotFoundResult();
            }
        }
    }
}
