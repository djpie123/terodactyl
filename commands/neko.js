const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent
 

exports.run = async (client, message, args, tools) => { //lets started your commands script
    const { body } = await superagent
    .get("https://nekos.life/api/neko"); //lets see wut we went
    link = body.neko;
    
    const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
    .setColor("#3bb9ff") //you can set it as you went
    .setTitle("Your Neko is here !")
    .setImage(body.neko) //here Neko is showing image
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
    name: "neko"
};
//By NightcoreAT#3678
