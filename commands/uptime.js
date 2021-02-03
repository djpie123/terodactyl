
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, message) => {
  const duration = moment.duration(this.client.uptime).format(' D [Days], H [Hours], m [Minutes], s [Seconds]');
  const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('BOT UPTIME')
      .setThumbnail(`${this.client.user.displayAvatarURL(({ dynamic: true }))}`)
      .addField("Uptime:", `${duration}`)
      .setFooter(`${this.client.user.username}`, `${this.client.user.displayAvatarURL({ dynamic: true })}`)
      .setTimestamp()
  return message.channel.send(embed);
}

module.exports.help = {
  name: "uptime"
};
// By NightcoreAT#3678
