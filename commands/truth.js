const Discord = require('discord.js'); //npm i discord.js


exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply('Provide a truth or mention as you went first thing!') // if they not mentioned nobody , so return as 'Provide a truth or mentions ....'
    const embed = new Discord.MessageEmbed() //once discordjs is update , RichEmbed Method is rename to MessageEmbed
    .setTitle("----") //its free you change | ${mentions.author.first} is allowed to set
    .setColor("#ffff00") // you can set it random
    .setImage(`https://api.alexflipnote.dev/scroll?text=` + args.join('%20')) //lets get the image which needed
    .setFooter(`©  ${customisation.ownername}`); // set your personnel footer
    message.channel.send({embed});
};

exports.conf = {
    enabled: true, // if enabled or no
    guildOnly: false, 
    aliases: [], // if you need aliases ? here example ['tru'] , this is work
    permLevel: 0
  };
  
  module.exports.help = {
    name: "truth"
};
//By NightcoreAT#3678
