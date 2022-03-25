using MapAYakApi.Interfaces;
using System.Net;
using System.Net.Mail;

namespace MapAYakApi.Services
{
    public class EmailService : IEmailService
    {
        #region Data Members

        private readonly IConfiguration _config;

        #endregion

        #region Constructor

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        #endregion

        #region Public Methods

        public bool SendEmail(string to, string subject, string body)
        {
            var message = new MailMessage(_config["EmailService:Email"], to);
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body;

            var client = new SmtpClient();
            client.Credentials = new NetworkCredential(_config["EmailService:Email"], _config["EmailService:Password"]);
            client.Host = "mapayak.com";
            client.Port = 587;
            client.EnableSsl = true;

            try
            {
                client.Send(message);
                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion
    }
}
