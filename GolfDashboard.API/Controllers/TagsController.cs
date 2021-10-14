using System.Linq;

using GolfDashboard.Data;
using GolfDashboard.DTO;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagsController : Controller
    {
        private readonly GolfDashboardDbContext _dbContext;

        public TagsController(GolfDashboardDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Json(_dbContext.Tags.Select(x => new TagDTO
            {
                ID = x.ID,
                Text = x.Text
            }));
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var tag = _dbContext.Tags.Include(t => t.Notes).FirstOrDefault(t => t.ID == id);

            if (tag == null)
                return NotFound();

            foreach(var note in tag.Notes)
                note.Tags.Remove(tag);

            _dbContext.Tags.Remove(tag);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
