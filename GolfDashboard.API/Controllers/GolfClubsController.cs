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
            if(lat == null || lng == null)
            {
                return Json(_dbContext.GolfClubs.Select(x => new GolfClubDTO
                {
                    Name = x.Name,
                    Address = string.Join(", ", x.Address.Split("\n", StringSplitOptions.None).ToArray()),
                    Website = x.Website,
                }).OrderBy(x => x.Name));
            }

            //Calculate the distance from the specified location to each club
            var clubs = _dbContext.GolfClubs.AsParallel().Select(x => new GolfClubDTO
            {
                Name = x.Name,
                Address = string.Join(", ", x.Address.Split("\n").ToArray()),
                Website = x.Website,
                DistanceInMiles = DistanceUtils.DistanceBetweenPositionsInMiles(x.Latitude, x.Longitude, lat.Value, lng.Value)
            });

            //https: //localhost:5001/golfclubs?lat=52.7225537&lng=-2.4203989999999997
            return Json(clubs.OrderBy(x => x.DistanceInMiles));
        }
    }
}
