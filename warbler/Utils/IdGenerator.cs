using System;using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace warbler.Utils
{
    public static class IdGenerator
    {
        private static int currId = 0;

        public static int GetNextId()
        {
            Interlocked.Increment(ref currId);
            return currId;
        }
    }
}
