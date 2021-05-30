using System.Collections.Generic;

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

        public IEnumerable<GolfClub> Get()
            => _context.GolfClubs.Include(c => c.Courses);
    }
}
