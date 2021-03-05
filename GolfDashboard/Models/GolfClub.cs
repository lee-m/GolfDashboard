// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

namespace GolfDashboard.Models
{
    public class GolfClub
    {
        private GolfClub()
        { }

        public GolfClub(int id, int displaySequence, string name, string address, double lat, double lng, string website)
        {
            ID = id;
            DisplaySequence = displaySequence;
            Name = name;
            Address = address;
            Latitude = lat;
            Longitude = lng;
            Website = website;
        }

        public int ID { get; private set; }
        public int DisplaySequence { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }
        public string Website { get; private set; }
    }
}
