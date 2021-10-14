using System.Collections.Generic;

namespace GolfDashboard.DTO
{
    public class CourseDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int NumberOfHoles { get; set; }
        public IEnumerable<TeeBoxDTO> TeeBoxes { get; set; }
    }
}
