namespace GolfDashboard.API.Models
{
    public class GolfClubDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public double? DistanceInMiles { get; set; }
    }
}
