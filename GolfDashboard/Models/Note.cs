using System.Collections.Generic;

// ReSharper disable AutoPropertyCanBeMadeGetOnly.Local

namespace GolfDashboard.Models
{
    public class Note
    {
        private Note()
        { }

        public Note(int id, string title, string content, ICollection<Tag> tags)
        {
            ID = id;
            Title = title;
            Content = content;
            Tags = tags;
        }

        public int ID { get; private set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
