using MapAYakApi.Dtos.Data;
using MapAYakApi.Extensions;
using MapAYakApi.Interfaces;
using MapAYakApi.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public IEnumerable<RouteDto> Routes()
        {
            return _routeRepository.GetRoutes().Select(c => GetRouteDto(c));
        }

        [HttpGet]
        public IEnumerable<LocationDto> Locations()
        {
            return _locationRepository.GetLocations().Select(c => GetLocationDto(c));
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<UserLayerDto> UserLayers()
        {
            var userId = _userManager.GetUserId(User);

            var routes = _routeRepository.GetUserRoutes(userId).Select(c => GetUserRouteDto(c));
            var locations = _locationRepository.GetUserLocations(userId).Select(c => GetUserLocationDto(c));

            return routes.Concat(locations);
        }

        [Authorize]
        [HttpPost]
        public IActionResult SaveRoute([FromBody] RouteDto dto)
        {
            if (dto.Coordinates == null || dto.Coordinates.Count() < 2)
                return BadRequest("No route data selected.");

            var userName = _userManager.GetUserName(User);
            if (dto.UserName == null || !dto.UserName.Equals(userName, StringComparison.CurrentCultureIgnoreCase))
                return BadRequest("Cannot add route for another user.");

            var route = GetRoute(dto);

            if (!TryValidateModel(route))
                return BadRequest(ModelState.GetErrorMessage());

            _routeRepository.SaveRoute(route);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public IActionResult SaveLocation([FromBody] LocationDto dto)
        {
            var userName = _userManager.GetUserName(User);
            if (dto.UserName == null || !dto.UserName.Equals(userName, StringComparison.CurrentCultureIgnoreCase))
                return BadRequest("Cannot add location for another user.");

            var location = GetLocation(dto);

            if (!TryValidateModel(location))
                return BadRequest(ModelState.GetErrorMessage());

            _locationRepository.SaveLocation(location);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public IActionResult UpdateRoute([FromBody] RouteDto dto)
        {
            if (dto.Coordinates == null || dto.Coordinates.Count() < 2)
                return BadRequest("No route data selected.");

            var userName = _userManager.GetUserName(User);
            if (dto.UserName == null || !dto.UserName.Equals(userName, StringComparison.CurrentCultureIgnoreCase))
                return BadRequest("Cannot update another user's route.");

            var newRoute = GetRoute(dto);

            if (!TryValidateModel(newRoute))
                return BadRequest(ModelState.GetErrorMessage());

            var oldRoute = _routeRepository.GetRoute(newRoute.Name);
            if (oldRoute == null)
                return BadRequest("Route not found.");

            _routeRepository.UpdateRoute(oldRoute, newRoute);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public IActionResult UpdateLocation([FromBody] LocationDto dto)
        {
            var userName = _userManager.GetUserName(User);
            if (dto.UserName == null || !dto.UserName.Equals(userName, StringComparison.CurrentCultureIgnoreCase))
                return BadRequest("Cannot update another user's location.");

            var newLocation = GetLocation(dto);

            if (!TryValidateModel(newLocation))
                return BadRequest(ModelState.GetErrorMessage());

            var oldLocation = _locationRepository.GetLocation(newLocation.Name);
            if (oldLocation == null)
                return BadRequest("Location not found.");

            _locationRepository.UpdateLocation(oldLocation, newLocation);

            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult DeleteRoute(string name)
        {
            var route = _routeRepository.GetRoute(name);
            if (route == null)
                return BadRequest("Route not found.");

            var userId = _userManager.GetUserId(User);
            if (route.UserId != userId)
                return BadRequest("Cannot delete another user's route.");

            _routeRepository.DeleteRoute(route);

            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult DeleteLocation(string name)
        {
            var location = _locationRepository.GetLocation(name);
            if (location == null)
                return BadRequest("Location not found.");

            var userId = _userManager.GetUserId(User);
            if (location.UserId != userId)
                return BadRequest("Cannot delete another user's location.");

            _locationRepository.DeleteLocation(location);

            return Ok();
        }

        #endregion

        #region Private Methods

        private RouteDto GetRouteDto(Route route)
        {
            return new RouteDto()
            {
                UserName = route.User.UserName,
                Name = route.Name,
                Description = route.Description,

                Coordinates = route.Coordinates.Select(coordinate => new CoordinateDto()
                {
                    Latitude = coordinate.Latitude,
                    Longitude = coordinate.Longitude
                })
            };
        }

        private LocationDto GetLocationDto(Location location)
        {
            return new LocationDto()
            {
                UserName = location.User.UserName,
                Type = location.Type,
                Name = location.Name,
                Description = location.Description,
                Latitude = location.Latitude,
                Longitude = location.Longitude
            };
        }

        private UserLayerDto GetUserRouteDto(Route route)
        {
            return new UserLayerDto()
            {
                Type = LayerType.Route,
                Name = route.Name,
                Description = route.Description
            };
        }

        private UserLayerDto GetUserLocationDto(Location location)
        {
            return new UserLayerDto()
            {
                Type = location.Type == LocationType.Portage ? LayerType.Portage : LayerType.Campsite,
                Name = location.Name,
                Description = location.Description
            };
        }

        private Route GetRoute(RouteDto dto)
        {
            var coordinates = dto.Coordinates.Select(c => new Coordinate()
            {
                Latitude = c.Latitude,
                Longitude = c.Longitude
            });

            return new Route()
            {
                UserId = _userManager.GetUserId(User),
                Name = dto.Name,
                Description = dto.Description,
                Coordinates = coordinates.ToList()
            };
        }

        private Location GetLocation(LocationDto dto)
        {
            return new Location()
            {
                UserId = _userManager.GetUserId(User),
                Type = dto.Type,
                Name = dto.Name,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude
            };
        }

        #endregion
    }
}
