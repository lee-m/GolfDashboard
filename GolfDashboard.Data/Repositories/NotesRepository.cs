using System;
using System.Collections.Generic;
using System.Linq;

using GolfDashboard.DTO;
using GolfDashboard.Interfaces;
using GolfDashboard.Models;

using Microsoft.EntityFrameworkCore;

namespace GolfDashboard.Data.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly GolfDashboardDbContext _context;

        public NotesRepository(GolfDashboardDbContext context)
        {
            _context = context;
        }

        public void Add(NoteDTO note)
        {
            _context.Notes.Add(new Note(0, note.Title, note.Content, GetNewNoteTags(note)));
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var note = _context.Notes.Find(id);

            if (note == null)
                throw new ArgumentException($"No note with ID {id} found for deletion");

            _context.Notes.Remove(note);
            _context.SaveChanges();
        }

        public void Update(NoteDTO note)
        {
            var existingNote = _context.Notes.Include(n => n.Tags).FirstOrDefault(n => n.ID == note.ID);

            if (note == null)
                throw new ArgumentException($"No note with ID {note.ID} found for deletion");

            existingNote.Title = note.Title;
            existingNote.Content = note.Content;

            //Delete any removed tags
            foreach(var existingTag in existingNote.Tags)
            {
                if (note.Tags.All(t => t.Text != existingTag.Text))
                    existingNote.Tags.Remove(existingTag);
            }

            //Add new tags
            foreach(var incomingTag in note.Tags)
            {
                if (existingNote.Tags.Any(t => t.Text == incomingTag.Text))
                    continue;

                //New tag. Might need to add a new one if we haven't seen it before
                var tag = _context.Tags.FirstOrDefault(t => t.Text == incomingTag.Text);

                if (tag != null)
                    existingNote.Tags.Add(tag);
                else
                {
                    var tagEntry = _context.Tags.Add(new Tag(incomingTag.ID, incomingTag.Text, null));
                    existingNote.Tags.Add(tagEntry.Entity);
                }
            }

            _context.SaveChanges();
        }

        public IEnumerable<Note> Get()
            => _context.Notes.Include(n => n.Tags);

        private ICollection<Tag> GetNewNoteTags(NoteDTO note)
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

            return tags;
        }
    }
}
