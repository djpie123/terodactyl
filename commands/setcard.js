const Discord = require('discord.js')
const db = require("quick.db")
const canvacord = require("canvacord")

module.exports.run = async (bot, message, args) => {
 let cArgs = args[0]
	 
 try{
	 
 db.set(`${message.author.id}`, cArgs)
 const card = new canvacord.Rank()
    .setUsername(message.author.username)
    .setDiscriminator(message.author.discriminator)
    .setRank("1")
    .setLevel("2000")
    .setCurrentXP("3000")
    .setRequiredXP("4000")
    .setStatus(message.author.presence.status)
    .setAvatar(message.author.displayAvatarURL({ format: "png", size: 1024 }))
    .setBackground("IMAGE", `${cArgs}`);

  const img = await card.build();
 message.channel.send(`You have successfully set ${cArgs} as your Rank card `).then(
     message.channel.send(`Preview :- \n ${new MessageAttachment(img, "rank.png")}`)
 )
return;
 }catch(e){
     console.log(e)
	return message.channel.send("Please provide a valid image url")
 }
 
 
}
module.exports.help = {
  name: "channel"
}