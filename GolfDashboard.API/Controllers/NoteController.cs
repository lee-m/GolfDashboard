using GolfDashboard.Data;
using GolfDashboard.Models;

using Microsoft.AspNetCore.Mvc;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        private readonly GolfDashboardDbContext _dbContext;

        public NoteController(GolfDashboardDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(Note newNote)
        {
            _dbContext.Notes.Add(newNote);
            _dbContext.SaveChanges();
        }
    }
}
