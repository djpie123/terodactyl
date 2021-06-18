const { ReactionCollector } = require('discord.js-collector')
const Discord = require("discord.js")
const pages = {
    '➡️': {
        embed: {
            title: 'HELP',
            url: 'https://discord.gg/Hfem6FbVgQ',
            author: {
		name: 'Terodactyl#6714',
		icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU',
	},
color: "RANDOM",
            

fields: [
		{
			name: '*rank',
			value: 'to check reank',
                        inline: true,
		},
		{
			name: '*chat',
			value: 'to chat with the bot',
			inline: true,
		},
		{
			name: '*jumble',
			value: 'gives you a jumble word puzzle',
			inline: true,
		},
		{
			name: '*meme',
			value: 'sends a meme',
			inline: true,
		},
		{
			name: '*enlarge',
			value: 'to enlarge an emoji',
			inline: true,
		},
                {
			name: '*trigger',
			value: 'to trigger yourself',
			inline: true,
		},
                 {
			name: '*leaderboard',
			value: 'to get the leaderboard',
			inline: true,
		},
                 {
			name: '*ping',
			value: 'to check the latency',
			inline: true,
		},
{
			name: '*g-start',
			value: 'to start giveaway',
			inline: true,
		},
{
			name: '*g-end',
			value: 'to end giveaway',
			inline: true,
		},
{
			name: '*g-reroll',
			value: 'to reroll giveaway',
			inline: true,
		},
 {
			name: '*discrim',
			value: 'to find a person with his tag',
                        inline: true,
		},
 {
			name: '*djs',
			value: 'to search something in discord.js',
                        inline: true,
		},
 {
			name: '*ascii',
			value: 'converts text to ascii',
                        inline: true,
		},
 { 
			name: '*av',
			value: "to get someone's avatar",
                        inline: true,
		},
 {
			name: '*whois',
			value: "to get someone's stats",
                        inline: true,
		},
       {
			name: '*serverinfo',
			value: 'to get serverinfo',
                        inline: true,
		},
 
        {
			name: '*warn',
			value: 'to warn someone',
                        inline: true,
		},
        {
			name: '*warnings',
			value: "to get someone's warning count",
                        inline: true,
		},
        {
			name: '*resetwarns',
			value: 'to reset the count of warnings of a person',
                        inline: true,
		},
		{
			name: '*upload_emote',
			value: 'to upload a custom emoji with image/gif in your server',
                        inline: true,
		},
		{
			name: '*setcard (it is a premium feature)',
			value: 'TO set your own custom rank card',
			inline: true,
		},
		{
			name: '*setw-card (it is a premium feature)',
			value: 'TO set custom welcome card for your server',
			inline: true,
		},
{
			name: '*setprefix <new prefix>',
			value: 'TO set custom prefix',
			inline: true,
		},
                {
			name: '*invite',
			value: 'TO add me to ur server',
			inline: true,
		},
		{
			name: '*vote',
			value: 'TO give me some support',
			inline: true,
		},
                {
			name: 'HOW CAN I REPORT BUGS??',
			value: 'JUST TYPE *report <bug>',
			inline: true,
		},
                {
			name: '🎮 :',
			value: 'to get fun commands',
                        inline: false,
		},
                {
			name: '🎵:',
			value: 'to get music commands',
                        inline: false,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'THIS BOT IS MADE BY PIE IS LIVE 💕||',
 }
        },
        reactions: ['🎵', '🎮'],
        pages: {
            '🎵': {
                backEmoji: '⬅️',
                embed: {
                   title:'MUSIC',
                   url:'https://discord.gg/Hfem6FbVgQ',
                   author: {
		name: 'Terodactyl#6714',
		icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU',
	},
color: "RANDOM",
fields: [
		{
			name: '*play/p',
			value: 'to play music',
                        inline: true,
		},
		{
			name: '*stop/leave',
			value: 'to stop',
			inline: true,
		},
		{
			name: '*skip',
			value: 'to skip to next song',
			inline: true,
		},
		{
			name: '*<filter name>',
			value: 'to apply filters',
			inline: true,
		},
		{
			name: '*volume <value> ',
			value: 'to set volume',
			inline: true,
		},
                {
			name: 'FILTERS',
			value: '3d,bassboost,echo,karaoke,nightcore,vaporwave,flanger',
			inline: true,
		},
{
			name: '*loop/repeat',
			value: 'to loop the song',
			inline: true,
		},
{
			name: '*que/qu',
			value: 'to view the que',
			inline: true,
		},
                {
			name: '*invite',
			value: 'TO add me to ur server',
			inline: true,
		},
		{
			name: '*vote',
			value: 'TO give me some support',
			inline: true,
		},
                {
			name: 'HOW CAN I REPORT BUGS??',
			value: 'JUST TYPE *report <bug>',
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'THIS BOT IS MADE BY PIE IS LIVE 💕||',
	},
}
            },
            '🎮': 
                {
                backEmoji: '⬅️',
                embed: {
                  title:'FUN',
                   url:'https://discord.gg/Hfem6FbVgQ',
                   author: {
		name: 'Terodactyl#6714',
		icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU',
	},
color: "RANDOM",
                    fields: [
		{
			name: '*fight',
			value: 'to fight someone',
                        inline: true,
		},
{
			name: '*fart',
			value: 'try it and see',
			inline: true,
		},
		{
			name: '*feed',
			value: 'to feed someone',
			inline: true,
		},
		{
			name: '*hammer',
			value: 'to hammer someone',
			inline: true,
		},
		{
			name: '*hug',
			value: 'to hug someone',
			inline: true,
		},
		{
			name: '*kiss',
			value: 'to kiss someone',
			inline: true,
		},
                {
			name: '*baka',
			value: 'to get a baka gif',
			inline: true,
		},
                 {
			name: '*neko',
			value: 'to get a neko',
			inline: true,
		},
                 {
			name: '*owoify',
			value: 'to make the bot owify something',
			inline: true,
		},
 {
			name: '*say',
			value: 'to make the bot say something',
                        inline: true,
		},
 {
			name: '*poke',
			value: 'to poke a person',
                        inline: true,
		},
 {
			name: '*roll',
			value: 'to roll a die',
                        inline: true,
		},
 { 
			name: '*slap',
			value: 'to slap someone',
                        inline: true,
		},
 {
			name: '*spank',
			value: 'to spank someone',
                        inline: true,
		},
 {
			name: '*smug',
			value: 'to smug',
                        inline: true,
		},
 {
			name: '**smack',
			value: 'to smack someone',
                        inline: true,
		},
 {
			name: '*tickle',
			value: 'to tickle someone',
                        inline: true,
		},
 {
			name: '*waifu',
			value: 'to get a waifu',
                        inline: true,
		},
 {
			name: '*dog',
			value: 'to get a dog image',
                        inline: true,
		},
 {
			name: '*cat',
			value: 'to get a cat image',
                        inline: true,
		},
 {
			name: '*panda',
			value: 'to get a panda image',
                        inline: true,
		},
 {
			name: '*dinosaur',
			value: 'to get a dinosaur image',
                        inline: true,
		},
		{
			name: '*ticktactoe',
			value: 'TO play ticktactoe with someone',
			inline: true,
		},
{
			name: '*pat',
			value: 'makes ur profile pic or profile pic of the user mentioned in ur msg a pet pet gif',
			inline: true,
		},
{
			name: '*rainbow',
			value: 'makes ur profile pic or profile pic of the user mentioned in ur msg rainbowed',
			inline: true,
		},
                {
			name: '*invite',
			value: 'TO add me to ur server',
			inline: true,
		},
		{
			name: '*vote',
			value: 'TO give me some support',
			inline: true,
		},	
                {
			name: 'HOW CAN I REPORT BUGS??',
			value: 'JUST TYPE *report <bug>',
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'THIS BOT IS MADE BY PIE IS LIVE 💕||',
 }
                },
            }
        }
    },
}

 
  
module.exports.run = async (client, message, args, interaction) => {
         const embed1 = new Discord.MessageEmbed()
           .setTitle('WEBSITE')
           .setURL('https://terodactyl.repl.co')
           .setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
		   .setDescription("React below t go to main commands page")
            .setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
            .setTimestamp()
            .setColor('RANDOM');
        const botMessage = await message.reply(embed1);
        ReactionCollector.menu({ botMessage, user: message.author, pages });
}
module.exports.help = {
    name: "help"
};
