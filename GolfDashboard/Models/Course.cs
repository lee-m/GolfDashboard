// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

namespace GolfDashboard.Models
{
    public class Course
    {
        private Course()
        { }

        public Course(int id, string name, int numberOfHoles, int sss, int slope, float rating)
        {
            ID = id;
            Name = name;
            NumberOfHoles = numberOfHoles;
            SSS = sss;
            Slope = slope;
            Rating = rating;
        }

        public int ID { get; private set; }
        public string Name { get; private set; }
        public int NumberOfHoles { get; private set; }
        public int SSS { get; private set; }
        public int Slope { get; private set; }
        public float Rating { get; private set; }
    }
}
