using System;
using System.Collections.Generic;
using System.Linq;

using GolfDashboard.API.Models;
using GolfDashboard.Data;

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
        public IEnumerable<GolfClubResponseModel> Get(double? lat, double? lng)
        {
            return _dbContext.GolfClubs.Select(x => new GolfClubResponseModel
            {
                Name = x.Name,
                Address = string.Join(", ", x.Address.Split("\n", StringSplitOptions.None).ToArray()),
                Website = x.Website,
                DistanceInMiles = lat == null || lng == null
                    ? 0
                    : DistanceUtils.DistanceBetweenPositionsInMiles(x.Latitude, x.Longitude, lat.Value, lng.Value)
            }).ToList().OrderBy(x => x.DistanceInMiles);
        }
    }
}
