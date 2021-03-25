using System.Collections.Generic;
using System.Linq;

using AutoMapper;

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
        private readonly IMapper _mapper;

        public NoteController(INotesRepository notesRepository,
                              IMapper mapper)
        {
            _notesRepository = notesRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public void AddOrUpdate(NoteDTO newNote)
        {
            if (newNote.ID == 0)
                _notesRepository.Add(newNote.ToNoteModel());
            else
                _notesRepository.Update(newNote.ToNoteModel());
        }

        [HttpGet]
        public IEnumerable<NoteDTO> Get()
        {
            return _mapper.Map<List<NoteDTO>>(_notesRepository.Get());
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _notesRepository.Delete(id);
        }
    }
}
