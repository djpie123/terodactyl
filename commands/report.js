const {MessageEmbed} = require("discord.js");
exports.run = (client, message) => { 
    let user = message.author;
    let args = message.content.split(" ").slice(1);
    message.react("☑️"); 
    if (args.join(" ") === "@everyone" || args.join(" ") === "@here") return message.channel.send("You ain't making me Ping anyone BOI!"); 
    let bug = new MessageEmbed()
    .setTitle(`${user.username}#${user.discriminator} has reported a bug`)
    .setDescription(args.join(" "))
    .setColor("RANDOM");
  const g = client.guilds.cache.get("828452877071941702")
      const ch = g.channels.cache.get('828460004766908446')
ch.send(bug)
}

module.exports.help = {
    name: "report"
};