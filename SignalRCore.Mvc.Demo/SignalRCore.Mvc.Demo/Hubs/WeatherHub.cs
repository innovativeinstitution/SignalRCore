using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRCore.Mvc.Demo.Hubs
{
    public class WeatherHub : Hub
    {
        public async Task BroadcastFromClient(string message)
        {
            await Clients.All.SendAsync("Broadcast", message);
        }
    }
}
