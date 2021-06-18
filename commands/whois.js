const Discord = require("discord.js"); 
module.exports.run =async (bot, message, args) => { 
  let inline = true 
  let resence = true 
  const status = { 
    online: "<:online:836140917206286356> Online", 
    idle: "<:idle:836140916250378271> Idle", 
    dnd: "<:dnd:836140916766408775> Do Not Disturb", 
    offline: "<:offline:836140917378646017> Offline/Invisible" } 
    const member = message.mentions.users.first() || message.author 
    const target = member 
const game = member.presence.activities || "not paying"
    if (member.bot) { bot = "<:bottag:836141332154023967> Yes"; 
  } else { 
    bot = "<:user:836140919131865120> No"; 
  } 
if(!game){
const g = "🎮";
}
  let embed = new Discord.MessageEmbed() 
.setAuthor(member.username) 
.setThumbnail((target.displayAvatarURL)) 
.setColor("RANDOM") 
.addField("Full Username", `${member.username}#${member.discriminator}` , inline) 
.addField("ID", member.id, inline) 
.addField("Bot", `${bot}`,inline, true) 
.addField("Status", `${status[member.presence.status]}`, inline, true) 
.addField("Playing", `🎮 ${game}`,inline, true) 
.addField("Joined Discord At", member.createdAt) 
.setFooter(`Information about ${member.username}`) 
.setTimestamp()
message.channel.send(embed); message.delete(); } 
module.exports.help = {
   name: "whois" 
  }