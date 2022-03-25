using MapAYakApi.Dtos.Account;
using MapAYakApi.Extensions;
using MapAYakApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace MapAYakApi.Controllers
{
    public class AccountController : Controller
    {
        #region Data Members

        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailService _emailService;

        #endregion

        #region Constructor

        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IEmailService emailService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _emailService = emailService;
        }

        #endregion

        #region Actions

        [HttpPost]
        public IActionResult SignIn([FromBody] SignInDto dto)
        {
            _signInManager.SignOutAsync().Wait();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = _userManager.FindByEmailAsync(dto.Email).Result;
            if (user == null)
                return BadRequest("Invalid sign in attempt.");

            if (!user.EmailConfirmed)
                return BadRequest("Email not confirmed.");

            var result = _signInManager.PasswordSignInAsync(user, dto.Password, dto.RememberPassword, false).Result;
            if (!result.Succeeded)
                return BadRequest("Invalid sign in attempt.");

            return Ok(new { userName = user.UserName });
        }

        [HttpGet]
        public IActionResult SignOutUser()
        {
            _signInManager.SignOutAsync().Wait();

            return Ok();
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = new IdentityUser()
            {
                Email = dto.Email,
                UserName = dto.UserName
            };

            var result = _userManager.CreateAsync(user, dto.Password).Result;
            if (!result.Succeeded)
                return BadRequest(String.Join("\r\n", result.Errors.Select(c => c.Description)));

            return SendEmailConfirmation(user);
        }

        [HttpPost]
        public IActionResult ConfirmEmail([FromBody] ConfirmEmailDto dto)
        {
            _signInManager.SignOutAsync().Wait();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = _userManager.FindByEmailAsync(dto.Email).Result;
            if (user == null)
                return BadRequest("Error confirming your email.");

            var token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(dto.Token));

            var result = _userManager.ConfirmEmailAsync(user, token).Result;
            if (!result.Succeeded)
                return BadRequest("Error confirming your email.");

            _signInManager.SignInAsync(user, false);

            return Ok(new { userName = user.UserName });
        }

        [HttpPost]
        public IActionResult ResendEmailConfirmation([FromBody] EmailDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = _userManager.FindByEmailAsync(dto.Email).Result;
            if (user == null)
                return Ok();

            return SendEmailConfirmation(user);
        }

        [HttpPost]
        public IActionResult ForgotPassword([FromBody] EmailDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = _userManager.FindByEmailAsync(dto.Email).Result;
            if (user == null)
                return Ok();

            var emailBody = GetPasswordResetMessage(user);

            var emailSent = _emailService.SendEmail(user.Email, "Reset Password", emailBody);
            if (!emailSent)
                return BadRequest("Failed to send email.");

            return Ok();
        }

        [HttpPost]
        public IActionResult ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessage());

            var user = _userManager.FindByEmailAsync(dto.Email).Result;
            if (user == null)
                return Ok();

            var token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(dto.Token));

            var result = _userManager.ResetPasswordAsync(user, token, dto.Password).Result;
            if (!result.Succeeded)
                return BadRequest(String.Join("\r\n", result.Errors.Select(c => c.Description)));

            return Ok();
        }

        #endregion

        #region Private Methods

        private IActionResult SendEmailConfirmation(IdentityUser user)
        {
            var emailBody = GetEmailConfirmationMessage(user);

            var emailSent = _emailService.SendEmail(user.Email, "Confirm Email", emailBody);
            if (!emailSent)
                return BadRequest("Failed to send email.");

            return Ok();
        }

        private string GetEmailConfirmationMessage(IdentityUser user)
        {
            var token = _userManager.GenerateEmailConfirmationTokenAsync(user).Result;
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var origin = Request.Headers.Origin.FirstOrDefault();
            if (string.IsNullOrEmpty(origin))
            {
                return string.Format("Please confirm your account by using your email and the token below with this url: {0}<br/>{1}",
                    Url.Action("ConfirmEmail", "Account"), token);
            }

            return string.Format("Please confirm your account by <a href='{0}/Account/ConfirmEmail?token={1}&email={2}'>clicking here</a>.",
                origin, token, user.Email);
        }

        private string GetPasswordResetMessage(IdentityUser user)
        {
            var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var origin = Request.Headers.Origin.FirstOrDefault();
            if (string.IsNullOrEmpty(origin))
            {
                return string.Format("Please reset your password by using the token below with this url: {0}<br/>{1}",
                    Url.Action("ResetPassword", "Account"), token);
            }

            return string.Format("Please reset your password by <a href='{0}/Account/ResetPassword?token={1}'>clicking here</a>.",
                origin, token);
        }

        #endregion
    }
}
