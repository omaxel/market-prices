using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;

namespace MarketPrices.Functions
{
    public static class NegotiateFunc
    {
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo Negotiate(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
            [SignalRConnectionInfo(HubName = SettingsNames.SIGNALR_HUB_NAME, ConnectionStringSetting = SettingsNames.SIGNALR_CONNECTIONSTRING_SETTING)] SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }
    }
}