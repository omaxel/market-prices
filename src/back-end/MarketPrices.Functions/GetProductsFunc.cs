using MarketPrices.Functions.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System.Collections.Generic;

namespace MarketPrices.Functions
{
    public static class GetProductsFunc
    {

        [FunctionName("get-products")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "products")] HttpRequest req,
            [CosmosDB(
                databaseName: SettingsNames.COSMOS_DATABASE_NAME,
                collectionName: SettingsNames.COSMOS_COLLECTION_NAME,
                ConnectionStringSetting = SettingsNames.COSMOS_CONNECTIONSTRING_SETTING,
                SqlQuery =  "SELECT * FROM c ORDER BY c.name")] IEnumerable<Product> products)
        {
            return new OkObjectResult(products);
        }
    }
}
