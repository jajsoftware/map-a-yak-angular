using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MapAYakApi.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Route
    {
        #region Database Fields

        public int Id { get; set; }

        [JsonIgnore]
        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        #endregion

        #region Relations

        [JsonIgnore]
        public IdentityUser User { get; set; }

        public IEnumerable<Coordinate> Coordinates { get; set; }

        #endregion

        #region Non-Database Fields

        [NotMapped]
        public string UserName
        {
            get
            {
                return User.UserName;
            }
        }

        #endregion
    }
}
