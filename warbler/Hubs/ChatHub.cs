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

        public async Task InvitePlayers(int gameId)
        {
            var game = _cache.Get<Game>(gameId);
            if (game == null)
            {
                await Clients.All.SendAsync("GameAvailable", gameId);
            }
            else
            {
                throw new ArgumentException("Invalid GameId");
            }
        }

    }
}
