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

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        #endregion

        #region Relations

        public IdentityUser User { get; set; }

        public IEnumerable<Coordinate> Coordinates { get; set; }

        #endregion
    }
}
