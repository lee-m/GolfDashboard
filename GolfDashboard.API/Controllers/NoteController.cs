using GolfDashboard.API.DTO;
using GolfDashboard.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        private readonly INotesRepository _notesRepository;

        public NoteController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpPost]
        public void Add(AddNoteDTO newNote)
        {
            _notesRepository.Add(newNote.ToNoteModel());
        }
    }
}
