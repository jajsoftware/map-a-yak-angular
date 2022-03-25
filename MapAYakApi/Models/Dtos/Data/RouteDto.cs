namespace MapAYakApi.Dtos.Data
{
    public class RouteDto
    {
        public string UserName { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IEnumerable<CoordinateDto> Coordinates { get; set; }
    }
}
