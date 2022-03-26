using MapAYakApi.Models;

namespace MapAYakApi.Dtos.Data
{
    public class UserLayerDto
    {
        public LayerType Type { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
