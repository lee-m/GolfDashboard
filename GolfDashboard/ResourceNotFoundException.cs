﻿using System;

namespace GolfDashboard
{
    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException(string message) : base(message)
        { }
    }
}
