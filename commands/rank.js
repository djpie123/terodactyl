const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();
  let userInfo = db[message.author.id] || db[member.id]
  const user = message.author || member
  const neededXP = "100"
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
    .setLevel(userInfo.level)
    .setCurrentXP(userInfo.xp)
    .setRequiredXP(neededXP)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }))
    .setBackground("IMAGE", 'https://i.pinimg.com/originals/96/fa/f2/96faf2d86ce88e7a25fc4b3913172043.jpg');

  const img = await card.build();
  
  return message.channel.send(new MessageAttachment(img, "rank.png"));
};

module.exports.help = {
  name: "rank"
};
