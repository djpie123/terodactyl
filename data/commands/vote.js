const Discord = require('discord.js')
const VOTE = new Discord.MessageEmbed()
.setTitle('VOTE')
.setURL('https://top.gg/bot/805461727733874718/vote')
.setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
.setColor('RANDOM')
.setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕||')
.setTimestamp();



module.exports.run = (client, message, args) => {
   message.author.send(VOTE)
 return message.channel.send('check your dms <a:vote:809283309796065300>');


}
module.exports.help = {
    name: "vote"
};