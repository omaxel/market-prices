using MarketPrices.Functions.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;

namespace MarketPrices.Functions
{
    public static class UpdateProductFunc
    {
        [FunctionName("update-product")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "products/{id}")] HttpRequest req,
            [CosmosDB(
                databaseName: SettingsNames.COSMOS_DATABASE_NAME,
                collectionName: SettingsNames.COSMOS_COLLECTION_NAME,
                ConnectionStringSetting = SettingsNames.COSMOS_CONNECTIONSTRING_SETTING,
                Id = "{id}",
                PartitionKey ="{id}")] Product product,
            ILogger log)
        {
            var id = req.RouteValues["id"] as string;

            if (product == null)
            {
                log.LogInformation($"No product found with id '{id}'.");
                return new NotFoundResult();
            }

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var requestData = JsonConvert.DeserializeObject<Product>(requestBody);

            // Changes to the input parameter are automatically persisted
            product.Name = requestData.Name;
            product.Price = requestData.Price;

            return new OkObjectResult(product);
        }
    }
}
