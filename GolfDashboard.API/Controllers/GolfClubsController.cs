using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using GolfDashboard.API.DTO;
using GolfDashboard.Interfaces;
using GolfDashboard.Models;

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
        public async Task<ActionResult> Get(double? lat, double? lng, int? id)
        {
            if(id != null)
            {
                var club = _mapper.Map<GolfClubDTO>(await _golfClubsRepository.GetAsync(id.Value));
                return Json(club);
            }

            var clubs = _mapper.Map<List<GolfClubDTO>>(await _golfClubsRepository.GetAsync());

            if (lat != null && lng != null)
            {
                //Calculate the distance from the specified location to each club
                clubs.AsParallel().ForAll(x =>
                {
                    x.DistanceInMiles = DistanceUtils.DistanceBetweenPositionsInMiles(x.Latitude, x.Longitude, lat.Value, lng.Value);
                });
            }

            return Json(clubs.OrderBy(x => x.DistanceInMiles));
        }

        [HttpPost]
        public async Task<ActionResult> Update(EditedClubDetails newDetails)
        {
            if (newDetails == null)
                return BadRequest();

            try
            {
                await _golfClubsRepository.UpdateAsync(newDetails);
                return Ok();
            }
            catch(ResourceNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
