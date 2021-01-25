namespace GolfDashboard.Models
{
    public class Note
    {
        private Note()
        { }

        public Note(int id, string title, string content)
        {
            ID = id;
            Title = title;
            Content = content;
        }

        public int ID { get; private set; }
        public string Title { get; private set; }
        public string Content { get; private set; }
    }
}
