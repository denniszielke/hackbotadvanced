var Promise = require('bluebird');

var ReviewsOptions = [
    '“Very stylish, great car”',
    '“good car”',
    '“Need more attention to little things”',
    '“Lovely small car ideally situated to explore the area.”',
    '“Positive surprise”',
    '“Beautiful color”'];

module.exports = {
    searchCars: function (destination) {
        return new Promise(function (resolve) {

            // Filling the cars results manually just for demo purposes
            var cars = [];
            for (var i = 1; i <= 5; i++) {
                cars.push({
                    name: destination + ' Car ' + i,
                    location: destination,
                    rating: Math.ceil(Math.random() * 5),
                    numberOfReviews: Math.floor(Math.random() * 5000) + 1,
                    priceStarting: Math.floor(Math.random() * 450) + 80,
                    image: 'https://placeholdit.imgix.net/~text?txtsize=35&txt=Car+' + i + '&w=500&h=260'
                });
            }

            cars.sort(function (a, b) { return a.priceStarting - b.priceStarting; });

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(cars); }, 1000);
        });
    }
};