using System.Collections.Generic;

namespace GolfDashboard.Models
{
    public class EditedClubDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }

        public IEnumerable<Course> Courses { get; set; }
    }
}
