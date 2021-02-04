const Discord = require("discord.js"); 
module.exports.run =async (bot, message, args) => { 
  let inline = true let resence = true 
  const status = { 
    online: "<:online:806731119260205057> Online", 
    idle: "<:idle:806731237627920404> Idle", 
    dnd: "<:dnd:806731376908959805> Do Not Disturb", 
    offline: "<:offline:806731149820559380> Offline/Invisible" } 
    const member = message.mentions.users.first() || message.author 
    const target = member 
    if (member.bot) { bot = "<:bottag:806732345175703563> Yes"; 
  } else { 
    bot = "<:user:806733095570505759> No"; 
  } 
  let embed = new Discord.MessageEmbed() 
.setAuthor(member.user.username) 
.setThumbnail((target.displayAvatarURL)) 
.setColor("RANDOM") 
.addField("Full Username", `${member.username}#${member.discriminator}` , inline) 
.addField("ID", member.id, inline) 
.addField("Bot", `${bot}`,inline, true) 
.addField("Status", `${status[member.presence.status]}`, inline, true) 
.addField("Playing", `${member.presence.game ? `🎮 ${member.presence.game.name}` : "<a:no:806742164301807626> Not playing"}`,inline, true) 
.addField("Joined Discord At", member.createdAt) 
.setFooter(`Information about ${member.username}`) 
.setTimestamp()
message.channel.send(embed); message.delete(); } 
module.exports.help = {
   name: "whois" 
  }