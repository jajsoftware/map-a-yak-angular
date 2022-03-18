using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Models
{
    public class Coordinate
    {
        #region Database Fields

        public int Id { get; set; }

        public int RouteId { get; set; }

        public int Order { get; set; }

        [Precision(18, 6)]
        [Range(-90, 90)]
        public decimal Latitude { get; set; }

        [Precision(18, 6)]
        [Range(-180, 180)]
        public decimal Longitude { get; set; }

        #endregion

        #region Relations

        public Route Route { get; set; }

        #endregion
    }
}
