using System.Diagnostics;
using AutoMapper;

namespace Application.Core
{
    public class MappingProfiles : Profile
    
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}