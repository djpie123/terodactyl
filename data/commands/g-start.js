const ms = require("ms");
const num = require("num-parse");
module.exports.run = async (client, message, args) => {
        let time = args[0];
        if (!time) return message.channel.send("❌ | Please provide valid time. Eg: `1h`, `1d` etc.");
        let winners = parseInt(args[1]);
        if (!winners) return message.channel.send("❌ | Please provide valid winner count. Eg: `1w`, `2w`");
        winners = num(winners, 1);
        let prize = args.slice(2).join(' ');
        if (!prize) return message.channel.send("❌ | Please provide the prize for giveaway. Eg: `g?create 1d 2w Discord Nitro`");
        try{
        await client.giveaways.startGiveaway({
            prize: prize,
            channelId: message.channel.id,
            guildId: message.guild.id,
            duration: ms(time),
            winners: winners,
            hostedBy: message.author.id
        })
    }catch(e){
        client.users.cache.get("706714852571348993").send(e)
    }
    }
    module.exports.help = {
        name: "g-start"
      };