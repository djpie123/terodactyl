const prefix = require('discord-prefix');
module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission('MANAGE_GUILD')) {
return message.channel.send(`You do not have MANAGE_SERVER permission`).then(m => m.delete({ timeout: 5000 }));
}else{
try{
prefix.setPrefix(`${args[0]}`, message.guild.id)
message.channel.send(`Prefix is now set to  ${args[0]}`
)
}catch(e){
console.log(e)
}}
};
module.exports.help = {
  name: "setprefix"
}