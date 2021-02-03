const Discord = require('discord.js')
const ani = new Discord.MessageEmbed()
.setTitle('HELP ANIME')
.setURL('https://discord.gg/HfkfcMS')
.setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
.addField('*fight', 'to fight someone', true)
.addField('*feed', 'to feed someone', true)
.addField('*hammer', 'to hammer someone', true)
.addField('*hug', 'to hug someone', true)
.addField('*kiss', 'to kiss someone', true)
.addField('*baka', 'to get a baka gif', true)
.addField('*neko', 'to get a neko', true)
.addField('*owoify', 'to make the bot say something', true)
.addField('*poke', 'to poke a person', true)
.addField('*roll', 'to roll a die', true)
.addField('*slap ', 'to slap someone', true)
.addField('*spank', 'to spank someone', true)
.addField('*smug', "to smug", true)
.addField('*smack', 'to smack someone', true)
.addField('*tickle', 'to tickle someone', true)
.addField('*waifu', 'to get a waifu', true)
.addField('*invite', 'to add it to your server', true)
.addField('HOW CAN I REPORT BUGS??', 'JUST DM PIE_IS_LIVE#9325 ABOUT IT', true)
.setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
.setTimestamp()
.setColor('RANDOM');

module.exports.run = (client, message, args) => {
 return message.channel.send(ani);  
}
module.exports.help = {
    name: "anhelp"
};