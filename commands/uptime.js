const Discord = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, message) => {
  var milliseconds = parseInt((client.uptime % 1000) / 100), //This field is intended to give the bot the number of hours and timing it needs to know the length of time the bot is running on
  seconds = parseInt((client.uptime / 1000) % 60),
  minutes = parseInt((client.uptime / (1000 * 60)) % 60),
  hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('BOT UPTIME')
      .setThumbnail(`${this.client.user.displayAvatarURL(({ dynamic: true }))}`)
      .addField("Uptime:",+ hours + " **hours, **" + minutes + "** minutes and **" + seconds + "." + milliseconds + "** seconds!")
      .setTimestamp()
  return message.channel.send(embed);
}

module.exports.help = {
  name: "uptime"
};
// By NightcoreAT#3678
