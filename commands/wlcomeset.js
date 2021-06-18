const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission('MANAGE_GUILD')) {
return message.channel.send(`You do not have MANAGE_SERVER permission`).then(m => m.delete({ timeout: 5000 }));
}else{
client.db.set(`wc_${message.guild.id}`, args[0])
const msg = `<#${args[0]}>`
if(msg === ("<#dm>" || "<#Dm>" || "<#DM>")){
message.channel.send(`Welcome is set to dm`)
}else if(msg === ("<#off>" || "<#Off>" || "<#OFF>")){
message.channel.send("Welcome is off")
}else{
message.channel.send(`Welcome channel is set to <#${args[0]}>`)
}
}
};
module.exports.help = {
	name: 'welcomechannel'
};