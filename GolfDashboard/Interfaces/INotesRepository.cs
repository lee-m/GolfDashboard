using System.Collections.Generic;

using GolfDashboard.DTO;
using GolfDashboard.Models;

namespace GolfDashboard.Interfaces
{
    public interface INotesRepository
    {
        void Add(NoteDTO note);
        void Delete(int id);
        void Update(NoteDTO note);
        IEnumerable<Note> Get();
    }
}
