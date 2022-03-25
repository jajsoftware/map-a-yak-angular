using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Location
    {
        #region Database Fields

        public int Id { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public string UserId { get; set; }

        public LocationType Type { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name can not be more than 100 characters.")]
        public string Name { get; set; }

        [MaxLength(10000, ErrorMessage = "Description can not be more than 10,000 characters.")]
        public string Description { get; set; }

        [Precision(18, 6)]
        [Range(-90, 90, ErrorMessage = "Latitude must be between -90 and 90.")]
        public decimal Latitude { get; set; }

        [Precision(18, 6)]
        [Range(-180, 180, ErrorMessage = "Longitude must be between -180 and 180.")]
        public decimal Longitude { get; set; }

        #endregion

        #region Relations

        public IdentityUser User { get; set; }

        #endregion
    }
}
