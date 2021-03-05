module.exports.run = async (client, message, args) => {
        const rerolled = await client.giveaways.rerollGiveaway(args.join(' '));
        
        if (!rerolled) {
            return message.channel.send('This giveaway hasn\'t ended');
        }
        else {
            message.channel.send('Rerolled the giveaway');
        }
    };
    module.exports.help = {
        name: "g-reroll"
      };