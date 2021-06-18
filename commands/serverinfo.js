const online = ("<:online:836140917206286356>")
const dnd = ("<:dnd:836140916766408775>")
const invis = ("<:offline:836140917378646017>")
const idle = ("<:idle:836140916250378271>")
const bottag = ("<:bottag:836141332154023967>")
const usertag = ("<:user:836140919131865120>")
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
