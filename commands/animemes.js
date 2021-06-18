//By NightcoreAT#3678
const Discord = require('discord.js'); //npm i discord.js 
const randomPuppy = require('random-puppy'); //npm i random-puppy
 //to import your personal footer

module.exports.run = (client, message, args) => { //Let's start the command script
    randomPuppy('animemes') //Let's check what we're looking for
    .then(url => { //then the results is
        const embed = new Discord.MessageEmbed() //as or is ; from here , your Command well become as RichEmbed Message {DiscordJS 12 has change it from RichEmbed to MessageEmbed}
        .setImage(url) //The link we requested turns into an image
        .setColor('#ff9900') //optinal ; you can set it random
        .setFooter('THIS BOT IS MADE BY PIE IS LIVE '); //here your personal footer
     return message.channel.send({ embed }); //done ; The image will be shown
})
}
  module.exports.help = {
    name: "animemes"
};
//By NightcoreAT#3678
