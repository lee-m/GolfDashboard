using System.Collections.Generic;
using System.Threading.Tasks;

using GolfDashboard.Interfaces;
using GolfDashboard.Models;

using Microsoft.EntityFrameworkCore;

namespace GolfDashboard.Data.Repositories
{
    public class GolfClubsRepository : IGolfClubsRepository
    {
        private readonly GolfDashboardDbContext _context;

        public GolfClubsRepository(GolfDashboardDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GolfClub>> GetAsync()
            => await _context.GolfClubs.Include(c => c.Courses).ToListAsync();

        public async Task<GolfClub> GetAsync(int id)
            => await _context.GolfClubs.Include(c => c.Courses).FirstAsync(x => x.ID == id);
    }
}
