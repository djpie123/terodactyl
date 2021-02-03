const Discord = require('discord.js'); //npm i discordjs@12.2.0 | npm i discord.js
const superagent = require('superagent'); //npm i superagent
 

exports.run = async (client, message, args, tools) => { //lets started
    if (!message.mentions.users.first()) return message.reply("Sir , please mention anyone , you cant feed nobody");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed"); 
    
    const embed = new Discord.MessageEmbed() // once discord is updated to latest version 12.2.0 , RichEmbed is removed and rename to MessageEmbed
    .setColor("#3bb9ff") // set your own color
    .setTitle(`Lol, ${message.mentions.users.first().username}, you got fed by your friends ${message.author.username}`) // lets make your command so fun 
    .setImage(body.url) //your commands well showing here
    .setFooter('THIS BOT IS MADE BY PIE IS LIVE '); // optional
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  module.exports.help = {
    name: "feed"
};
//By NightcoreAT#3678
