using System.Collections.Generic;
using System.Threading.Tasks;

using GolfDashboard.DTO;
using GolfDashboard.Models;

namespace GolfDashboard.Interfaces
{
    public interface IGolfClubsRepository
    {
        Task<IEnumerable<GolfClub>> GetAsync();
        Task<GolfClub> GetAsync(int id);

        Task UpdateAsync(EditedClubDetailsDTO editDetails);
    }
}
