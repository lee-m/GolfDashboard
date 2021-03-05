// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

using System.Collections.Generic;

namespace GolfDashboard.Models
{
    public class Tag
    {
        private Tag()
        { }

        public Tag(int id, string text, IEnumerable<Note> notes)
        {
            ID = id;
            Text = text;
            Notes = notes;
        }

        public int ID { get; private set; }
        public string Text { get; private set; }
        public IEnumerable<Note> Notes { get; private set; }
    }
}
