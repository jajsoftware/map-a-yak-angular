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

        public IEnumerable<RouteDto> Routes()
        {
            var routes = _routeRepository.GetRoutes();

            return routes.Select(route => GetRouteDto(route));
        }

        public IEnumerable<LocationDto> Locations()
        {
            var locations = _locationRepository.GetLocations();

            return locations.Select(location => GetLocationDto(location));
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
