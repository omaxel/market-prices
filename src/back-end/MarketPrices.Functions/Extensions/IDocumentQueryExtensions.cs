using Microsoft.Azure.Documents.Linq;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPrices.Functions.Extensions
{
    public static class IDocumentQueryExtensions
    {
        public static async Task<T> FirstOrDefaultAsync<T>(this IDocumentQuery<T> queryable)
        {
            if (queryable.HasMoreResults)
            {
                var response = await queryable.ExecuteNextAsync<T>();

                if (response.Any())
                    return response.First();
            }

            return default;
        }
    }
}
