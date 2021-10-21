using MarketPrices.Functions.Models;
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MarketPrices.Functions
{
    public static class ProductChangedFunc
    {
        [FunctionName("product-changed")]
        public static async Task Run([CosmosDBTrigger(
            databaseName: SettingsNames.COSMOS_DATABASE_NAME,
            collectionName: SettingsNames.COSMOS_COLLECTION_NAME,
            ConnectionStringSetting = SettingsNames.COSMOS_CONNECTIONSTRING_SETTING,
            LeaseCollectionName = SettingsNames.COSMOS_LEASES_COLLECTION_NAME,
            CreateLeaseCollectionIfNotExists = true
            )] IReadOnlyList<Document> modifiedProducts,
            [SignalR(HubName = SettingsNames.SIGNALR_HUB_NAME, ConnectionStringSetting = SettingsNames.SIGNALR_CONNECTIONSTRING_SETTING)] IAsyncCollector<SignalRMessage> signalRMessages,
            ILogger log,
            CancellationToken cancellationToken)
        {
            if (modifiedProducts == null || modifiedProducts.Count == 0)
            {
                log.LogInformation("No products changed");
                return;
            }

            var products = modifiedProducts.ToArray();
            var tasks = new List<Task>();
            foreach (var product in products)
            {
                log.LogInformation($"Product with Id {product.Id} has been modified.");

                var message = new SignalRMessage() { Target = "product-update", Arguments = new[] { (Product)(dynamic)product } };

                tasks.Add(
                    signalRMessages.AddAsync(message, cancellationToken)
                );
            }

            await Task.WhenAll(tasks);
        }
    }
}
