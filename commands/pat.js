const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent


exports.run = async (client, message, args, tools) => { //lets started your commands script
    if (!message.mentions.users.first()) return message.reply("you almost mention someone to pat them"); //if no one is mentions , lets reply as
    if (message.mentions.users.first().id === "482128001828651008") return message.channel.send('<a:yayyy:497742636439044096>'); //lets make a some a some funny reply |you can set a random emoji|
    const { body } = await superagent
    .get("https://nekos.life/api/pat"); //lets see wut we went
    
    const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
    .setColor("#3bb9ff") //you can set it as you went
    .setTitle(`i see that is, ${message.author.username} patted ${message.mentions.users.first().username}`) //lets reply as 
    .setImage(body.url) // lets showing pat (GIF}
    .setFooter('THIS BOT IS MADE BY PIE IS LIVE '); //your personnel Footer
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  module.exports.help = {
    name: "pat"
};
//By NightcoreAT#3678
