// load environmental variables
require('dotenv').config();

const config = require('./config');
const request = require('request');
const restify = require('restify');
const builder = require('botbuilder');

const dialogs = {};
dialogs.helpExplorer = require('./dialogs/helpExplorer.js');
dialogs.adamsExplorer = require('./dialogs/adamsExplorer.js');

//If testing via the emulator, no need for appId and appPassword. If publishing, enter appId and appPassword here 
const connector = new builder.ChatConnector({
    appId: config.appId,
    appPassword: config.appPassword,
    gzipData: true
});

// create the bot
const bot = new builder.UniversalBot(connector, (session) => {
    const message = new builder.Message(session);
    message.text = 'Hi there. What would you like to explore?';
    message.attachments([
        new builder.ThumbnailCard(session)
            .buttons([
                builder.CardAction.imBack(
                    session, dialogs.helpExplorer.title, dialogs.helpExplorer.title
                ),
                builder.CardAction.imBack(
                    session, dialogs.adamsExplorer.title, dialogs.adamsExplorer.title
                )
            ])
            .title('How would you like to start?')
    ]);
    session.endConversation(message);
});

// register the dialogs
bot.dialog(dialogs.helpExplorer.id, dialogs.helpExplorer.dialog)
    .triggerAction({ matches: new RegExp(dialogs.helpExplorer.title, 'i') });
// adamsexplorer will provide answer to the ultimate question
bot.dialog(dialogs.adamsExplorer.id, dialogs.adamsExplorer.dialog)
    .triggerAction({ matches: new RegExp(dialogs.adamsExplorer.title, 'i') });

// reset stuck dialogs in case of versioning
bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));

// Setup Restify Server
const server = restify.createServer();
server.post('/api/messages', connector.listen());

server.listen(3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});