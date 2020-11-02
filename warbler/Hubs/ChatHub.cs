using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task CreateGame()
        {
            var gameId = IdGenerator.GetNextId();
            var game = new Game() { Id = IdGenerator.GetNextId(), Player1 = Context.ConnectionId };
            var entry = _cache.CreateEntry(gameId);
            entry.Value = game;
            await Clients.All.SendAsync("GameCreated", gameId);
        }

        public async Task JoinGame(int gameId)
        {
            var game = _cache.Get<Game>(gameId);
            if (game != null)
            {
                game.Player2 = Context.ConnectionId;
                await Clients.All.SendAsync("GameStarted", gameId);
            }
            else
            {
                await Clients.All.SendAsync("Error", "Game not found");
            }
        }

    }
}
