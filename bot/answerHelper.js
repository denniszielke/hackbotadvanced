const request = require('request');
const rootQueryString = "https://someurl"
const imageBaseUrl = "https://raw.githubusercontent.com/denniszielke/hackbotsimple/master/bot/img/";

module.exports = {
    facetQuery: (facet, callback) => {
        var options = [
            {'value': 'Overview'},
            {'value': 'Popular'}
            ];
        callback(null, options);
        // image that we were calling an external service
        // const options = {
        //     url: `${rootQueryString}&facet=${facet}`,
        //     headers: {
        //         'api-key': `${process.env.AZURE_SEARCH_KEY}`
        //     }
        // }
        // request(options, (error, response, body) => {
        //     if (error) {
        //         callback(error, null);
        //     } else {
        //         const result = JSON.parse(body);
        //         if (!result || !result['@search.facets'] || !result['@search.facets'][facet]) {
        //             // No items for that facet found
        //             callback(null, null);
        //         } else {
        //             callback(null, result['@search.facets'][facet]);
        //         }
        //     }
        // });
    },
    searchQuery: (keyword, callback) => {

        if (keyword === 'Overview'){
            var options = [
            { 'name': 'Can do', 'score': 1, 'description': 'I can explain what this bot can do', 'imageUrl': imageBaseUrl + 'can.png'},
            { 'name': 'Cannot do', 'score': 1, 'description': 'I can explain what this bot cannot do', 'imageUrl': imageBaseUrl + 'cannot.png'},
            { 'name': 'Who am I', 'score': 1, 'description': 'I can explain what this is', 'imageUrl': imageBaseUrl + 'info.png'},
            ];
            callback(null, options);
        }else
        {
            callback(null, null);   
        }
    }
}