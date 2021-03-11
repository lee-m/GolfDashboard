using System.Collections.Generic;
using System.Linq;

using GolfDashboard.Interfaces;
using GolfDashboard.Models;

namespace GolfDashboard.Data.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly GolfDashboardDbContext _context;

        public NotesRepository(GolfDashboardDbContext context)
        {
            _context = context;
        }

        public void Add(Note note)
        {
            var tags = new List<Tag>();

            foreach (var tagToAdd in note.Tags)
            {
                var existingTag = _context.Tags.FirstOrDefault(t => t.Text == tagToAdd.Text);

                if (existingTag == null)
                {
                    existingTag = new Tag(0, tagToAdd.Text, null);
                    _context.Tags.Add(existingTag);
                }

                tags.Add(existingTag);
            }

            _context.Notes.Add(new Note(0, note.Title, note.Content, tags));
            _context.SaveChanges();
        }
    }
}
