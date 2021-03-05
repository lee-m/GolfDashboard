using System.Linq;

using GolfDashboard.API.DTO;
using GolfDashboard.Data;

using Microsoft.AspNetCore.Mvc;

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
    }
}
