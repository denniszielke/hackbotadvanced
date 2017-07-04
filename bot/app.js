// load environmental variables
require('dotenv-extended').load();

const config = require('./config');
const request = require('request');
const restify = require('restify');
const builder = require('botbuilder');
var Store = require('./store');
var spellService = require('./spell-service');

//If testing via the emulator, no need for appId and appPassword. If publishing, enter appId and appPassword here 
const connector = new builder.ChatConnector({
    appId: config.appId,
    appPassword: config.appPassword,
    gzipData: true
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});

// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
var recognizer = new builder.LuisRecognizer(config.luisModelUrl);
bot.recognizer(recognizer);

bot.dialog('SearchCars', [
    function (session, args, next) {
        session.send('Welcome to the cars finder! We are analyzing your message: \'%s\'', session.message.text);

        // try extracting entities
        var cityEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.geography.city');
        var airportEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'AirportCode');
        if (cityEntity) {
            // city entity detected, continue to next step
            session.dialogData.searchType = 'city';
            next({ response: cityEntity.entity });
        } else if (airportEntity) {
            // airport entity detected, continue to next step
            session.dialogData.searchType = 'airport';
            next({ response: airportEntity.entity });
        } else {
            // no entities detected, ask user for a destination
            builder.Prompts.text(session, 'Please enter your destination');
        }
    },
    function (session, results) {
        var destination = results.response;

        var message = 'Looking for cars';
        if (session.dialogData.searchType === 'airport') {
            message += ' near %s airport...';
        } else {
            message += ' in %s...';
        }

        session.send(message, destination);

        // Async search
        Store
            .searchCars(destination)
            .then(function (cars) {
                // args
                session.send('I found %d cars:', cars.length);

                var message = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cars.map(carAsAttachment));

                session.send(message);

                // End
                session.endDialog();
            });
    }
]).triggerAction({
    matches: 'SearchCars',
    onInterrupted: function (session) {
        session.send('Please provide a destination');
    }
});

bot.dialog('Help', function (session) {
    session.endDialog('Hi! Try asking me things like \'search cars in Seattle\', \'search cars near LAX airport\' or \'show me the reviews of The Bot Resort\'');
}).triggerAction({
    matches: 'Help'
});

// Spell Check
if (process.env.IS_SPELL_CORRECTION_ENABLED === 'true') {
    bot.use({
        botbuilder: function (session, next) {
            spellService
                .getCorrectedText(session.message.text)
                .then(function (text) {
                    session.message.text = text;
                    next();
                })
                .catch(function (error) {
                    console.error(error);
                    next();
                });
        }
    });
}

// // reset stuck dialogs in case of versioning
// bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));

// // Setup Restify Server
// const server = restify.createServer();
// server.post('/api/messages', connector.listen());

// server.listen(process.env.port || process.env.PORT || 3978, () => {
//     console.log('%s listening to %s', server.name, server.url);
// });

function carAsAttachment(car) {
    return new builder.HeroCard()
        .title(car.name)
        .subtitle('%d stars. %d reviews. From $%d per night.', car.rating, car.numberOfReviews, car.priceStarting)
        .images([new builder.CardImage().url(car.image)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.bing.com/search?q=cars+in+' + encodeURIComponent(car.location))
        ]);
}