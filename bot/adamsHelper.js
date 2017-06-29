const request = require('request');
const rootQueryString = "https://someurl";
const imageBaseUrl = "https://raw.githubusercontent.com/denniszielke/hackbotsimple/master/bot/img/";

module.exports = {
    facetQuery: (facet, callback) => {
        var options = [
            {'value': 'What is the ultimate question?'},
            {'value': 'What is the ultimate answer?'}
            ];
        callback(null, options);
    },
    searchQuery: (keyword, callback) => {

        if (keyword === 'What is the ultimate question?'){
            var options = [
            { 'name': 'Why', 'score': 1, 'description': 'Why?', 'imageUrl': '/img/can.png'},
            { 'name': 'Six times seven', 'score': 1, 'description': 'What do you get when you multiply six by seven?', 'imageUrl': imageBaseUrl + 'can.png'},
            { 'name': 'Lightbulbs?', 'score': 1, 'description': 'How many Vogons does it take to change a lightbulb?', 'imageUrl': imageBaseUrl + 'can.png'},
            { 'name': 'In base 13', 'score': 1, 'description': 'What do you get when you multiply six by nine in base 13?', 'imageUrl': imageBaseUrl + 'can.png'},
            ];
            callback(null, options);
        }else
        {
            callback(null, [{ 'name': '42!', 'score': 42, 'description': 'There you have the ultimate answer', 'imageUrl': imageBaseUrl + '42.png'}]);   
        }
    }
}