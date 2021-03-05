using System;
using System.Linq;

using GolfDashboard.API.Models;
using GolfDashboard.Data;

using Microsoft.AspNetCore.Mvc;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GolfClubsController : Controller
    {
        private readonly GolfDashboardDbContext _dbContext;

        public GolfClubsController(GolfDashboardDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult Get(double? lat, double? lng)
        {
            var result = _dbContext.GolfClubs.Select(x => new GolfClubDTO
            {
                Name = x.Name,
                Address = string.Join(", ", x.Address.Split("\n", StringSplitOptions.None).ToArray()),
                Website = x.Website,
                DistanceInMiles = lat == null || lng == null
                    ? (double?)null
                    : DistanceUtils.DistanceBetweenPositionsInMiles(x.Latitude, x.Longitude, lat.Value, lng.Value)
            }).OrderBy(x => x.DistanceInMiles);

            return Json(result);
        }
    }
}
