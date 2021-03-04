const Discord = require('discord.js')
const db = require("quick.db")
const canvacord = require("canvacord")

module.exports.run = async (client, message, args) => {
  let premium = Db.get("user")
  if (message.author.id !== premium){
    return message.channel.send(`This is a premium command pleas buy and retry`)
  }
 let cArgs = args[0]
 let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

 let level = client.db.get(`level_${user.id}`) || 0;
 let exp = client.db.get(`xp_${user.id}`) || 0;
 let neededXP = Math.floor(Math.pow(level / 0.1, 2));

 let every = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
 let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;
    
 try{	 
 db.set(`${message.author.id}`, cArgs)
 const card = new canvacord.Rank()
 .setUsername(user.username)
 .setDiscriminator(user.discriminator)
 .setRank(rank)
 .setLevel(level)
 .setCurrentXP(exp)
 .setRequiredXP(neededXP)
 .setStatus(user.presence.status)
 .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }))
 .setBackground("IMAGE", `${cArgs}`);

  const img = await card.build();
 message.channel.send(`You have successfully set _${cArgs}_ as your Rank card `).then(
     message.channel.send(`Preview :-`),
     message.channel.send(new Discord.MessageAttachment(img, "rank.png"))
 )
return;
 }catch(e){
     console.log(e)
	return message.channel.send("Please provide a valid image url")
 }
 
 
}
module.exports.help = {
  name: "setcard"
}