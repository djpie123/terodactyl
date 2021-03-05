module.exports.run = async (client, message, args) => {
        const ended = await client.giveaways.endGiveaway(args.join(' '));
        
        if (!ended) {
            return message.channel.send('This giveaway has already ended');
        }
        else {
            message.channel.send('Ended the giveaway');
        }
    }
module.exports.help = {
   name: "g-end"   
};