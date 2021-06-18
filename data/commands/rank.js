const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord")
module.exports.run = async (client, message, args) => {
  const db = client.db
  let c = db.fetch(`${message.author.id}`)
	
	if(c == null) c = "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
	
	if(!c) return;
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let level = client.db.get(`level_${user.id}`) || 0;
  let exp = client.db.get(`xp_${user.id}`) || 0;
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));

  let every = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;

// v4 rank card
//   let img = await canvacord.rank({
//     username: user.username,
//     discrim: user.discriminator,
//     currentXP: exp.toString(),
//     neededXP: neededXP.toString(),
//     rank: rank.toString(),
//     level: level.toString(),
//     avatarURL: user.displayAvatarURL({ format: "png" }),
//     background: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1000&q=80"
//   });
  
  // v5 rank card
  const card = new canvacord.Rank()
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(rank)
    .setLevel(level)
    .setCurrentXP(exp)
    .setRequiredXP(neededXP)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }))
    .setBackground("IMAGE", `${c}`);

  const img = await card.build();
  
  return message.channel.send(new MessageAttachment(img, "rank.png"));
};

module.exports.help = {
  name: "rank"
};
