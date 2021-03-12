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
        public void Add(NoteDTO newNote)
        {
            _notesRepository.Add(newNote.ToNoteModel());
        }

        [HttpGet]
        public IEnumerable<NoteDTO> Get()
        {
            return _mapper.Map<List<NoteDTO>>(_notesRepository.Get());
        }
    }
}
