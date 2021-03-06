﻿using System.Collections.Generic;
using System.Linq;

using GolfDashboard.Models;

namespace GolfDashboard.API.DTO
{
    public class NoteDTO
    {
        public Note ToNoteModel()
        {
            var tagModels = Tags?.Select(t => new Tag(0, t.Trim(), null)).ToList();
            return new Note(ID, Title.Trim(), Content.Trim(), tagModels);
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}
