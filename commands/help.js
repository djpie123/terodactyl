const Discord = require('discord.js')
const help = new Discord.MessageEmbed()
.setTitle('HELP')
.setURL('https://discord.gg/HfkfcMS')
.setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
.addField('*rank', 'to check reank', true)
.addField('*chat', 'to chat with the bot', true)
.addField('*jumble', 'gives you a jumble word puzzle', true)
.addField('*meme', 'sends a meme', true)
.addField('*enlarge', 'to enlarge an emoji', true)
.addField('*trigger', 'to trigger yourself', true)
.addField('*leaderboard', 'to get the leaderboard', true)
.addField('*ping', 'to check the latency', true)
.addField('*discrim', 'to find a person with his tag', true)
.addField('*djs', 'to search something in discord.js', true)
.addField('*ascii', 'converts text to ascii', true)
.addField('*dinosaur', 'sends random pic of dinosaur', true)
.addField('*av', "to get someone's avatar", true)
.addField('*anihelp', 'to get animae commands', true)
.addField('*invite', 'to add it to your server', true)
.addField('HOW CAN I REPORT BUGS??', 'JUST DM PIE_IS_LIVE#9325 ABOUT IT', true)
.setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
.setTimestamp()
.setColor('RANDOM');

module.exports.run = (client, message, args) => {
 return message.channel.send(help);  
}
module.exports.help = {
    name: "help"
};