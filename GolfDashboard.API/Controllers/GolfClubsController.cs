using System.Collections.Generic;

using GolfDashboard.Data;
using GolfDashboard.Models;

using Microsoft.AspNetCore.Mvc;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GolfClubsController : ControllerBase
    {
        private readonly GolfDashboardDbContext _dbContext;

        public GolfClubsController(GolfDashboardDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<GolfClub> Get(double lat, double lng)
        {
            return _dbContext.GolfClubs;
        }
    }
}
