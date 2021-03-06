var config = {};

//process.env variables defined in Azure if deployed to a web app. For testing, place IDs and Keys inline
config.searchName = process.env.SEARCH_NAME ? process.env.SEARCH_NAME : "<YourSearchName>";
config.indexName = process.env.INDEX_NAME ? process.env.INDEX_NAME : "<YourIndexName>";
config.searchKey = process.env.SEARCH_KEY ? process.env.SEARCH_KEY : "<YourSearchKey>";

config.queryString = 'https://' + config.searchName + '.search.windows.net/indexes/' + config.indexName + '/docs?api-key=' + config.searchKey + '&api-version=2015-02-28&';

config.mongoUrl = process.env.MONGO_URL ? process.env.MONGO_URL : "<YourMongoUrl>";
config.mongoKey = process.env.MONGO_KEY ? process.env.MONGO_KEY : "<YourMongoKey>";

config.instrumentationKey = process.env.INSTRUMENTATIONKEY ? process.env.INSTRUMENTATIONKEY : "<YourInsightsKey>";

config.luisUrl = process.env.LUIS_URL ? process.env.LUIS_URL : "<YourLuisUrl>";
config.luisModelUrl = process.env.LUIS_MODEL_URL ? process.env.LUIS_MODEL_URL : "<YourLuisModel>";
config.luisKey = process.env.LUIS_KEY ? process.env.LUIS_KEY : "<YourLuisKey>";

config.spellUrl = process.env.SPELL_URL ? process.env.SPELL_URL : "<YourBingSpellUrl>";
config.spellKey = process.env.SPELL_KEY ? process.env.SPELL_KEY : "<YourBingSpellKey>";

config.appId = process.env.MICROSOFT_APP_ID;
config.appPassword = process.env.MICROSOFT_APP_PASSWORD;

module.exports = config;