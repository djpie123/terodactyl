const Discord = require('discord.js')
module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
                `Websocket Latency: ${
                this.client.ws.ping ? Math.floor(this.client.ws.ping) : 0
                }ms\nBot Latency: ${Math.round(
                    Date.now() - message.createdTimestamp
                )}ms`
            )
            .setColor("#7289DA");
            return message.channel.send(embed)
}

module.exports.help = {
    name: "ping"
};
