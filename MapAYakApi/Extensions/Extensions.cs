using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MapAYakApi.Extensions
{
    public static class ModelStateDictionaryExtensions
    {
        public static string GetErrorMessage(this ModelStateDictionary modelState)
        {
            var errors = modelState.Values.SelectMany(c => c.Errors).Select(c => c.ErrorMessage);

            return String.Join("\r\n", errors);
        }
    }
}
