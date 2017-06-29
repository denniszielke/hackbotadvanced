const builder = require('botbuilder');

module.exports = {
    getCarousel: (session, items) => {
        // results found
        var message = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
        items.forEach((item) => {
            // custom card for musician
            // update with your specific fields for output
            message.addAttachment(
                new builder.HeroCard(session)
                    .title(item.name)
                    .subtitle("Result for " + item.name + " has "  + item.score)
                    .text(item.description)
                    .images([builder.CardImage.create(session, item.imageUrl)])
            );
        })
        return message;
    }
}