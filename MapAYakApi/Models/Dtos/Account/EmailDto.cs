using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Dtos.Account
{
    public class EmailDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
