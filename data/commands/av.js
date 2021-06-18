const Discord = require('discord.js')
module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  const url = user.displayAvatarURL({ dynamic: true, size: 256});
  const avem = new Discord.MessageEmbed()
  .setAuthor(user.username +'#'+ user.discriminator +`'s avatar`)
  .setColor('RANDOM')
  .setImage(url);
  message.channel.send(avem)
}
module.exports.help = {
    name: "av"
};