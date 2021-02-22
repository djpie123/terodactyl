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
        let newchannel = await message.channel.clone()
        newchannel.setPosition(message.channel.position)
        await message.channel.delete()
        const em = new MessageEmbed()
        .setTitle("BOOOOOM")
        .setDescription(reason)
        .setImage("https://i.imgur.com/4mJ3qcQ.gif")
        await newchannel.send(em)
    }
}
module.exports.help = {
    name: "nuke"
};