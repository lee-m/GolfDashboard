using System.Collections.Generic;

namespace GolfDashboard.DTO
{
    public class EditedClubDetailsDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }

        public IEnumerable<CourseDTO> Courses { get; set; }
    }
}
