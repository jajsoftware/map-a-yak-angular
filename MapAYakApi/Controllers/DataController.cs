using MapAYakApi.Interfaces;
using MapAYakApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Route = MapAYakApi.Models.Route;

namespace MapAYakApi.Controllers
{
    public class DataController : Controller
    {
        #region Data Members

        private readonly UserManager<IdentityUser> _userManager;
        private readonly IRouteRepository _routeRepository;
        private readonly ILocationRepository _locationRepository;

        #endregion

        #region Constructor

        public DataController(UserManager<IdentityUser> userManager,
            IRouteRepository routeRepository, ILocationRepository locationRepository)
        {
            _userManager = userManager;
            _routeRepository = routeRepository;
            _locationRepository = locationRepository;
        }

        #endregion

        #region Actions

        public IEnumerable<Route> Routes()
        {
            return _routeRepository.GetRoutes();
        }

        public IEnumerable<Location> Locations()
        {
            return _locationRepository.GetLocations();
        }

        //[Authorize]
        [HttpPost]
        public IActionResult SaveRoute(Route route)
        {
            if (route.Coordinates == null || route.Coordinates.Count() < 2)
                return BadRequest("No route data selected.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = _userManager.GetUserId(User);
            if (route.UserId != userId)
                return BadRequest("Cannot add route for another user.");

            _routeRepository.SaveRoute(route);

            return Ok();
        }

        //[Authorize]
        [HttpPost]
        public IActionResult SaveLocation(Location location)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = _userManager.GetUserId(User);
            if (location.UserId != userId)
                return BadRequest("Cannot add location for another user.");

            _locationRepository.SaveLocation(location);

            return Ok();
        }

        #endregion
    }
}
