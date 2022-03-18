﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Location
    {
        #region Database Fields

        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public LocationType Type { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        [Precision(18, 6)]
        [Range(-90, 90)]
        public decimal Latitude { get; set; }

        [Precision(18, 6)]
        [Range(-180, 180)]
        public decimal Longitude { get; set; }

        #endregion

        #region Relations

        public IdentityUser User { get; set; }

        #endregion
    }
}
