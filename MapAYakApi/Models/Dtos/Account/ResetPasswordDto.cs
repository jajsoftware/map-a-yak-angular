using System.ComponentModel.DataAnnotations;

namespace MapAYakApi.Dtos.Account
{
    public class ResetPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
