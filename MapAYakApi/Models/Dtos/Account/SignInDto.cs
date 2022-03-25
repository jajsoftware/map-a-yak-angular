using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Dtos.Account
{
    public class SignInDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberPassword { get; set; }
    }
}
