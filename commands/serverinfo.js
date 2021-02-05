const online = ("<:online:806731119260205057>")
const dnd = ("<:dnd:806731376908959805>")
const invis = ("<:offline:806731149820559380>")
const idle = ("<:idle:806731237627920404>")
const bottag = ("<:bottag:806732345175703563>")
const usertag = ("<:user:806733095570505759>")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name:"serverinfo",
    async run (client, message, args) {
        let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        let emojis = message.guild.emojis.cache;
        let members = message.guild.members.cache;
        let channels = message.guild.channels.cache;
        let embed = new MessageEmbed()
        .setTitle(`Information for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setColor("RED")
        .addField("Normal information", [
            `**❯ Name**: ${message.guild.name}`,
            `**❯ ID**: ${message.guild.id}`,
            `**❯ Icon**: [click here](${message.guild.iconURL({dynamic: true})})`,
            `**❯ Owner**: <@${message.guild.ownerID}>`,  
            '\u200b'
        ])
        .addField('More information', [
            `**❯ Membercount**: ${message.guild.memberCount}`,
            `**❯ ${bottag}Bots**: ${members.filter(m => m.user.bot).size}`,
            `**❯ ${usertag}Humans**: ${members.filter(m => !m.user.bot).size}`,
            `**❯ Emoji count**: ${message.guild.emojis.cache.size}`,
            `**❯ Animated Emoji count**: ${emojis.filter(e => e.animated).size}`,
            `**❯ Not animated Emoji count**: ${emojis.filter(e => !e.animated).size}`,
            `**❯ Role count**: ${roles.length}`,
            `**❯ Channels**: ${message.guild.channels.cache.size}`,
            `**❯ Text Channels**: ${channels.filter(ch => ch.type === "text").size}`,
            `**❯ Voice Channels**: ${channels.filter(ch => ch.type === "voice").size}`,
            `**❯ News Channels**: ${channels.filter(ch => ch.type === "news").size}`,

           

            '\u200b'
        ])
        .addField("Statuses", [
            `**❯ ${online}Online**: ${members.filter(m => m.presence.status === "online").size}`,
            `**❯ ${idle}Idle**: ${members.filter(m => m.presence.status === "idle").size}`,
            `**❯ ${dnd}Dnd**: ${members.filter(m => m.presence.status === "dnd").size}`,
            `**❯ ${invis}Offline**: ${members.filter(m => m.presence.status === "offline").size}`,
            '\u200b'
        ])
        message.channel.send(embed)
    }
}
module.exports.help = {
  name: "serverinfo"
};
