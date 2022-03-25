using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Route
    {
        #region Database Fields

        public int Id { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name can not be more than 100 characters.")]
        public string Name { get; set; }

        [MaxLength(10000, ErrorMessage = "Description can not be more than 10,000 characters.")]
        public string Description { get; set; }

        #endregion

        #region Relations

        public IdentityUser User { get; set; }

        public IEnumerable<Coordinate> Coordinates { get; set; }

        #endregion
    }
}
