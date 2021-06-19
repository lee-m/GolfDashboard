using System.Collections.Generic;

namespace GolfDashboard.API.DTO
{
    public class GolfClubDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double? DistanceInMiles { get; set; }

        public IEnumerable<CourseDTO> Courses { get; set; }
    }
}
