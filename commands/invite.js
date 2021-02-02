const Discord = require('discord.js')
const invite = new Discord.MessageEmbed()
.setTitle('INVITE')
.setURL('https://discord.com/api/oauth2/authorize?client_id=805461727733874718&permissions=379904&scope=bot')
.setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
.setColor('RANDOM')
.setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕||')
.setTimestamp();



module.exports.run = (client, message, args) => {
   message.author.send(invite)
 return message.channel.send('check your dms <a:Hearts1:805714587453620265>');


}
module.exports.help = {
    name: "invite"
};