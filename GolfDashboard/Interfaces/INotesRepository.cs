﻿using System.Collections.Generic;

using GolfDashboard.Models;

namespace GolfDashboard.Interfaces
{
    public interface INotesRepository
    {
        void Add(Note note);
        IEnumerable<Note> Get();
    }
}