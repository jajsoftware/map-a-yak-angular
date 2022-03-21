using Route = MapAYakApi.Models.Route;

namespace MapAYakApi.Interfaces
{
    public interface IRouteRepository
    {
        IEnumerable<Route> GetRoutes();
        void SaveRoute(Route route);
    }
}
