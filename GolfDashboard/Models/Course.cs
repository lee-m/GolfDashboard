// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

using System.Collections.Generic;

namespace GolfDashboard.Models
{
    public class Course
    {
        private Course()
        { }

        public Course(int id, string name, int numberOfHoles, ICollection<TeeBox> teeBoxes)
        {
            ID = id;
            Name = name;
            NumberOfHoles = numberOfHoles;
            TeeBoxes = teeBoxes;
        }

        public int ID { get; private set; }
        public string Name { get; private set; }
        public int NumberOfHoles { get; private set; }
        public ICollection<TeeBox> TeeBoxes { get; private set; }
    }
}
