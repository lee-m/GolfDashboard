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
            CreateMap<Course, CourseDTO>();

            CreateMap<Note, NoteDTO>()
                .ForMember(m => m.Tags, opts => opts.MapFrom(n => n.Tags.Select(t => t.Text).ToList()));

            CreateMap<GolfClub, GolfClubDTO>()
                .ForMember(m => m.DistanceInMiles, opts => opts.Ignore());
        }
    }
}
