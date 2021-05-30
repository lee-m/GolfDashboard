using System.Linq;

using AutoMapper;

using GolfDashboard.API.DTO;
using GolfDashboard.Models;

namespace GolfDashboard.API
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Tag, TagDTO>();
            CreateMap<Note, NoteDTO>()
                .ForMember(m => m.Tags, opts => opts.MapFrom(n => n.Tags.Select(t => t.Text).ToList()));
            CreateMap<Course, CourseDTO>();
        }
    }
}
