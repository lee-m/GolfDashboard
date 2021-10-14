using System.Collections.Generic;

using AutoMapper;

using GolfDashboard.DTO;
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
                _notesRepository.Add(newNote);
            else
                _notesRepository.Update(newNote);
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
