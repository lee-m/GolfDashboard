using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GolfDashboard.Data;
using GolfDashboard.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GolfClubsController : ControllerBase
    {
        private readonly ILogger<GolfClubsController> _logger;
        private readonly GolfDashboardDbContext _dbContext;

        public GolfClubsController(ILogger<GolfClubsController> logger,
                                   GolfDashboardDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<GolfClub> Get()
        {
            return _dbContext.GolfClubs;
        }
    }
}
