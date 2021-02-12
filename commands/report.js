const {MessageEmbed} = require("discord.js");

const {MessageEmbed} = require("discord.js")
exports.run = (client, message) => { 
    let user = message.author;
    let args = message.content.split(" ").slice(1);
    message.react("☑️"); 
    if (args.join(" ") === "@everyone" || args.join(" ") === "@here") return message.channel.send("You ain't making me Ping anyone BOI!"); 
    let bug = new MessageEmbed()
    .setTitle(`${user.username}#${user.discriminator} has reprted a bug`)
    .setDescription(args.join(" "))
   client.users.cache.get("706714852571348993").send(bug); 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [], 
    permLevel: 0
};

module.exports.help = {
    name: "report"
};