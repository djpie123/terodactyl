const Discord = require('discord.js')
module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
               "BOT LATENCY : " + Math.round(client.ws.ping) + "ms")
            .setColor("RANDOM");
            return message.channel.send(embed)
}

module.exports.help = {
    name: "ping"
};
