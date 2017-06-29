module.exports = function () {
    //process.env variables defined in Azure if deployed to a web app. For testing, place IDs and Keys inline
    config.searchName = process.env.SEARCH_NAME ? process.env.SEARCH_NAME : "<YourSearchName>";
    config.indexName = process.env.INDEX_NAME ? process.env.INDEX_NAME : "<YourIndexName>";
    config.searchKey = process.env.SEARCH_KEY ? process.env.SEARCH_KEY : "<YourSearchKey>";
    
    config.queryString = 'https://' + searchName + '.search.windows.net/indexes/' + indexName + '/docs?api-key=' + searchKey + '&api-version=2015-02-28&';

    config.mongoUrl = process.env.MONGO_URL ? process.env.MONGO_URL : "<YourMongoUrl>";
    config.mongoKey = process.env.MONGO_KEY ? process.env.MONGO_KEY : "<YourMongoKey>";

    config.instrumentationKey = process.env.INSTRUMENTATIONKEY ? process.env.INSTRUMENTATIONKEY : "<YourInsightsKey>";

    config.luisUrl = process.env.LUIS_URL ? process.env.LUIS_URL : "<YourLuisUrl>";
    config.luisKey = process.env.LUIS_KEY ? process.env.LUIS_KEY : "<YourLuisKey>";

    config.appId = process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : "<YourAppId>";
    config.appPassword = process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : "<YourAppPassword>";
}