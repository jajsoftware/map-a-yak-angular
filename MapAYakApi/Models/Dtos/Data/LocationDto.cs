using MapAYakApi.Models;

namespace MapAYakApi.Dtos.Data
{
    public class LocationDto
    {
        public string UserName { get; set; }

        public LocationType Type { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }
    }
}
