using System.Collections.Generic;
using System.Linq;

using AutoMapper;

using GolfDashboard.API.DTO;
using GolfDashboard.API.Models;
using GolfDashboard.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace GolfDashboard.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GolfClubsController : Controller
    {
        private readonly IGolfClubsRepository _golfClubsRepository;
        private readonly IMapper _mapper;

        public GolfClubsController(IGolfClubsRepository golfClubsRepository,
                                   IMapper mapper)
        {
            _golfClubsRepository = golfClubsRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult Get(double? lat, double? lng)
        {
            if(lat == null || lng == null)
            {
                return Json(_golfClubsRepository.Get().Select(x => new GolfClubDTO
                {
                    ID = x.ID,
                    Name = x.Name,
                    Address = string.Join(", ", x.Address.Split("\n").ToArray()),
                    Website = x.Website,
                    Courses = _mapper.Map<List<CourseDTO>>(x.Courses)
                }).OrderBy(x => x.Name));
            }

            //Calculate the distance from the specified location to each club
            var clubs = _golfClubsRepository.Get().AsParallel().Select(x => new GolfClubDTO
            {
                Name = x.Name,
                Address = string.Join(", ", x.Address.Split("\n").ToArray()),
                Website = x.Website,
                DistanceInMiles = DistanceUtils.DistanceBetweenPositionsInMiles(x.Latitude, x.Longitude, lat.Value, lng.Value)
            });

            return Json(clubs.OrderBy(x => x.DistanceInMiles));
        }
    }
}
