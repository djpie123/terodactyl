const Discord = require('discord.js');
const fetch = require('node-fetch').default;
module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first() || message.member;
const picture = member.user.displayAvatarURL({ size: 1024, format: 'jpg' })
	const buffer = await (await fetch('https://api.monkedev.com/canvas/gay?imgUrl=' + encodeURIComponent(picture))).buffer();
	const attachment = new Discord.MessageAttachment(buffer, 'rainbow.jpg');
	message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
};
module.exports.help = {
	name: 'rainbow',
};