const Discord = require('discord.js')
const help = new Discord.MessageEmbed()
.setTitle('HELP')
.setURL('https://discord.gg/HfkfcMS')
.setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
.addField('*play/p', 'to play music', true)
.addField('*stop/leave', 'to stop', true)
.addField('*skip', 'to skip to next song', true)
.addField('*<filter name>', 'to add filter', true)
.addField('*volume <value> ', 'to set volume', true)
.addField('FILTERS :-', '3d,bassboost,echo,karaoke,nightcore,vaporwave,flanger', true)
.addField('*invite', 'to add it to your server', true)
.addField('HOW CAN I REPORT BUGS??', 'JUST DM PIE_IS_LIVE#9325 ABOUT IT', true)
.setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
.setTimestamp()
.setColor('RANDOM');

module.exports.run = (client, message, args) => {
 return message.channel.send(help);  
}
module.exports.help = {
    name: "music"
};