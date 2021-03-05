using System.Collections.Generic;

// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

namespace GolfDashboard.Models
{
    public class Note
    {
        private Note()
        { }

        public Note(int id, string title, string content, IEnumerable<Tag> tags)
        {
            ID = id;
            Title = title;
            Content = content;
            Tags = tags;
        }

        public int ID { get; private set; }
        public string Title { get; private set; }
        public string Content { get; private set; }
        public IEnumerable<Tag> Tags { get; private set; }
    }
}
