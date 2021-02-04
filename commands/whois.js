const Discord = require("discord.js");

module.exports.run =async (bot, message, args) => {
    let inline = true
    let resence = true
    const status = {
        online: "<:online:424890369688469504> Online",
        idle: "<:idle:424890472855502849> Idle",
        dnd: "<:dnd:424890429524410368> Do Not Disturb",
        offline: "<:offilne:424890400319340546> Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.author
let target = message.mentions.users.first() || message.author

if (member.bot) {
    bot = "<:bottag:425631858265423883> Yes";
  } else {
    bot = "<:user:424958082691629057> No";
  }

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("Full Username", `${member.username}#${member.discriminator}` , inline)
                .addField("ID", member.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `<a:nod:806741519117713418> Nickname: ${member.nickname}` : "<a:no:806742164301807626> None"}`, true)
                .addField("Bot", `${bot}`,inline, true)
                .addField("Status", `${status[member.presence.status]}`, inline, true)
                .addField("Playing", `${member.presence.game ? `🎮 ${member.presence.game.name}` : "<a:no:806742164301807626> Not playing"}`,inline, true)
                .addField("Roles", `${member.roles.map(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<a:no:806742164301807626> No Roles"}`, true)
                .addField("Joined Discord At", member.createdAt)
                .setFooter(`Information about ${member.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }

    module.exports.help = {
        name: "whois"
    }