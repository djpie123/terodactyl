const { MessageEmbed } = require('discord.js')
module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You do not have the perms to use this cmd!")
        }
        let reason = args.join(" ") || "No Reason"
        if(!message.channel.deletable) {
            return message.reply("This channel cannot be nuked!")
        }
        let pos = message.channel.getPosition("")
        let newchannel = await message.channel.clone()
        newchannel.setPosition(pos)
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setTitle("Channel Nuked")
        .setDescription(reason)
        .setImage("https://i.imgur.com/4mJ3qcQ.gif")
        .setColor("RANDOM")
        await newchannel.send(embed)
    }
}
module.exports.help = {
    name: "nuke"
};