// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

using System.Collections.Generic;

namespace GolfDashboard.Models
{
    public class GolfClub
    {
        private GolfClub()
        { }

        public GolfClub(int id, int displaySequence, string name, string address, double lat, double lng, string website, IEnumerable<Course> courses)
        {
            ID = id;
            DisplaySequence = displaySequence;
            Name = name;
            Address = address;
            Latitude = lat;
            Longitude = lng;
            Website = website;
            Courses = courses;
        }

        public int ID { get; private set; }
        public int DisplaySequence { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }
        public string Website { get; private set; }

        public IEnumerable<Course> Courses { get; private set; }
    }
}
