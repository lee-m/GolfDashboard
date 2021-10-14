using System.Linq;

using AutoMapper;

using GolfDashboard.DTO;
using GolfDashboard.Models;

namespace GolfDashboard.API
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TagDTO, Tag>();

            CreateMap<CourseDTO, Course>()
                .ReverseMap();

            CreateMap<TeeBoxDTO, TeeBox>()
                .ReverseMap();

            CreateMap<EditedClubDetailsDTO, GolfClub>()
                .ReverseMap();

            CreateMap<Note, NoteDTO>()
                .ForMember(m => m.Tags, opts => opts.MapFrom(n => n.Tags.Select(t => t.Text).ToList()));

            CreateMap<GolfClub, GolfClubDTO>()
                .ForMember(m => m.DistanceInMiles, opts => opts.Ignore());
        }
    }
}
