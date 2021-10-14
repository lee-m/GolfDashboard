using System.Collections.Generic;
using System.Threading.Tasks;

using AutoMapper;

using GolfDashboard.DTO;
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
            => await _context.GolfClubs.Include(c => c.Courses).ThenInclude(c => c.TeeBoxes).AsSingleQuery().ToListAsync();

        public async Task<GolfClub> GetAsync(int id)
            => await _context.GolfClubs.Include(c => c.Courses).ThenInclude(c => c.TeeBoxes).AsSingleQuery().FirstAsync(x => x.ID == id);

        public async Task UpdateAsync(EditedClubDetailsDTO editDetails)
        {
            var club = await GetAsync(editDetails.ID);

            if (club == null)
                throw new ResourceNotFoundException($"No club found with ID {editDetails.ID}");

            await using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                //Zap and re-add courses and tee-boxes
                foreach (var course in club.Courses)
                {
                    _context.RemoveRange(course.TeeBoxes);
                    _context.Remove(course);
                }

                await _context.SaveChangesAsync();

                _mapper.Map(editDetails, club);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
        }
    }
}
