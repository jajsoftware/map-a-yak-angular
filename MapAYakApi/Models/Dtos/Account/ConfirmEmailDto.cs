using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Dtos.Account
{
    public class ConfirmEmailDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
