﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace warbler.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int CurrentPlayer { get; set; }
        public bool HasStarted { get; set; }
    }
}
