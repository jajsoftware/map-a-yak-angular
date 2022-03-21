using MapAYakApi.Models;

namespace MapAYakApi.Interfaces
{
    public interface ILocationRepository
    {
        IEnumerable<Location> GetLocations();
        void SaveLocation(Location location);
    }
}
