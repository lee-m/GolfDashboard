using System.Collections.Generic;
using System.Threading.Tasks;

using AutoMapper;

using GolfDashboard.Interfaces;
using GolfDashboard.Models;

using Microsoft.EntityFrameworkCore;

namespace GolfDashboard.Data.Repositories
{
    public class GolfClubsRepository : IGolfClubsRepository
    {
        private readonly GolfDashboardDbContext _context;
        private readonly IMapper _mapper;

        public GolfClubsRepository(GolfDashboardDbContext context,
                                   IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GolfClub>> GetAsync()
            => await _context.GolfClubs.Include(c => c.Courses).ThenInclude(c => c.TeeBoxes).ToListAsync();

        public async Task<GolfClub> GetAsync(int id)
            => await _context.GolfClubs.Include(c => c.Courses).ThenInclude(c => c.TeeBoxes).FirstAsync(x => x.ID == id);

        public async Task UpdateAsync(EditedClubDetails editDetails)
        {
            var club = await GetAsync(editDetails.ID);

            if (club == null)
                throw new ResourceNotFoundException($"No club found with ID {editDetails.ID}");

            _mapper.Map(editDetails, club);
            await _context.SaveChangesAsync();
        }
    }
}
