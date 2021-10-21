namespace MarketPrices.Functions
{
    public static class SettingsNames
    {
        public const string COSMOS_DATABASE_NAME = "market-prices";
        public const string COSMOS_COLLECTION_NAME = "products";
        public const string COSMOS_CONNECTIONSTRING_SETTING = "CosmosDBConnection";
        public const string COSMOS_LEASES_COLLECTION_NAME = "products_leases";

        public const string SIGNALR_HUB_NAME = "market_prices";
        public const string SIGNALR_CONNECTIONSTRING_SETTING = "SignalRConnection";
    }
}
