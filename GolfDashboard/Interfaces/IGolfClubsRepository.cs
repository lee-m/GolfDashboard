using System.Collections.Generic;

using GolfDashboard.Models;

namespace GolfDashboard.Interfaces
{
    public interface IGolfClubsRepository
    {
        IEnumerable<GolfClub> Get();
    }
}
