using System.Collections.Generic;
using System.Linq;

using GolfDashboard.Models;

namespace GolfDashboard.API.DTO
{
    public class AddNoteDTO
    {
        public Note ToNoteModel()
        {
            var tagModels = Tags?.Select(t => new Tag(t.ID, t.Text, null));
            return new Note(ID, Title, Content, tagModels);
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<TagDTO> Tags { get; set; }
    }
}
