using System.Collections.Generic;

namespace GolfDashboard.DTO
{
    public class NoteDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<TagDTO> Tags { get; set; }
    }
}
