const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Snowflake = require("snowflake-api");
client.db = require("quick.db");
const prefix = require('discord-prefix');
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
const lyricsFinder = require('lyrics-finder');
const DisTube = require('distube')
client.config = {
    TOKEN: process.env.token, //Discord Bot Token
    API_TOKEN: "NzA2NzE0ODUyNTcxMzQ4OTkz.MTYxMTg0MTM1NjY2Nw==.0150d78f668cc42489fc333cb2a73811", //API Token found at http://api.snowflakedev.cf:9019/dashboard
    cooldown: 0,
    prefix: "*"
};
const api = new Snowflake.Client(client.config.API_TOKEN);
client.snowapi = api;
const distube = new DisTube(client, {searchSongs: true, emitNewSongOnly: true, highWaterMark: 1<<25})

const filters = ["3d","bassboost","echo","karaoke","nightcore","vaporwave","flanger"]
this.client = client;
// Events
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
    });
});
this.client = client;
// Events
client.once("ready", () => {

    client.user.setActivity(`*help in ${this.client.guilds.cache.size} servers || type *invite to invite`, {
        type: "PLAYING",
      });

    console.log("Ready!");
});

client.on("error", console.error);

client.on("warn", console.warn);

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    // Handle XP
    xp(message);
    // command handler
    if (!message.content.startsWith(client.config.prefix)) return;
    let args = message.content.slice(client.config.prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) return;
    commandFile.run(client, message, args, api);
});

function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let xp = client.db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}
client.on("message", message => {
    if(message.author.bot){ return; }
    if(!message.guild) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if(command === "ping"){
        return embedbuilder(client, message, `RANDOM`, `PING:`, `\`${client.ws.ping} ms\``)
    }

    if(command === "play" || command === "p"){
        embedbuilder(client, message, "YELLOW", "Searching!", args.join(" "))
        return distube.play(message, args.join(" "));
    }
    if(command === "skip" || command === "s"){
        embedbuilder(client, message, "YELLOW", "SKIPPED!", `Skipped the song`)
        return distube.skip(message);
    } 
    if(command === "stop" || command === "leave"){
        embedbuilder(client, message, "RED", "STOPPED!", `Leaved the channel`)
        return distube.stop(message);
    }
    if(command === "seek"){
        embedbuilder(client, message, "GREEN", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
        return distube.seek(message, Number(args[0]*1000));
    } 
    if(filters.includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "YELLOW", "Adding filter!", filter)
    }
    if(command === "volume" || command === "vol"){
        
        embedbuilder(client, message, "GREEN", "VOLUME!", `changed volume to \`${args[0]} %\``)
        return distube.setVolume(message, args[0]);
    } 
    if (command === "queue" || command === "qu"){
        let queue = distube.getQueue(message);
        let curqueue = queue.songs.map((song, id) =>
        `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n");
        return  embedbuilder(client, message, "GREEN", "Current Queue!", curqueue)
    }
    if (command === "loop" || command === "repeat"){
        if(0 <= Number(args[0]) && Number(args[0]) <= 2){
            distube.setRepeatMode(message,parseInt(args[0]))
            embedbuilder(client, message, "GREEN", "Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
        }
        else{
            embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }
    }
    if ( command === "jump"){
        let queue = distube.getQueue(message);
        if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
            embedbuilder(client, message, "RED", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
            return distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));
        }
        else{
            embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }

    
    }
	if(command === "lyrics"){
		let queue = distube.getQueue(message);
        let curqueue = queue.songs.map((song) =>{
			var title = `${song.name}`,
			const author = " ",
			(async function(artist, title) {
			 let lyric = await lyricsFinder(artist, title) || "Not Found!";
		      const lyrics = new Discord.MessageEmbed()
		     .setTitle(`${song.name} lyrics`)
		     .setDescription(lyric)
		      message.channel.send(lyrics)
		
			 c	
	
		
	
	 }	     
	)})}});

		
//queue
const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
//distube
distube
     .on("playSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Playing new Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n${status(queue)}`)
     })
     .on("addSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Added a Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`)
     })
     .on("playList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "GREEN", "Playling playlist", `Playlist: \`${playlist.title}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}\n\nstarting playing Song: \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`)
     })
     .on("addList", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Added a Playling!", `Playlist: \`${playlist.title}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}`)
     })
     .on("searchResult", (message, result) => {
        let i = 0;
        embedbuilder(client, message, "YELLOW", "", `**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
     // DisTubeOptions.searchSongs = true
     .on("searchCancel", (message) =>  embedbuilder(client, message, "RED", `Searching canceled`, "")
     )
     .on("error", (message, err) => embedbuilder(client, message, "RED", "An error encountered:", err)
     )
     

//function embeds
//embedbuilder(client, message, "RED", "TITEL", "DESCRIPTION")
function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    return message.channel.send(embed);
}

const { ReactionCollector } = require('discord.js-collector')
const pages = {
    '➡️': {
        embed: {
            title: 'HELP',
            url: 'https://discord.gg/HfkfcMS',
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
			value: 'JUST DM PIE_IS_LIVE#9325 ABOUT IT',
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
                   url:'https://discord.gg/HfkfcMS',
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
			value: 'JUST DM PIE_IS_LIVE#9325 ABOUT IT',
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'THIS BOT IS MADE BY PIE IS LIVE 💕||',
	},
},
 onMessage: async (controller, message) => {
                    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                    if (!channel)
                        return message.reply('🚫 | You\'ve forgot mention a channel or use their id.').then((m) => m.delete({ timeout: 3000 }));

                    // Do what you want here, like set it on database...
                    return await message.reply(`✅ | Success! You've settled welcome channel as ${channel}.`).then(m => m.delete({ timeout: 3000 }));
                }
            },
            '🎮': 
                {
                backEmoji: '⬅️',
                embed: {
                  title:'FUN',
                   url:'https://discord.gg/HfkfcMS',
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
			value: 'JUST DM PIE_IS_LIVE#9325 ABOUT IT',
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'THIS BOT IS MADE BY PIE IS LIVE 💕||',
 }
                },
                onMessage: async (controller, message) => {
                    // Do what you want here, like set it on database..
                    return await message.reply('✅ | Success!').then(m => m.delete({ timeout: 3000 }));
                }
            }
        }
    },
}

 
  
client.on("message", async (message) => {
    if (message.content.startsWith('*help')){ 
         const embed1 = new Discord.MessageEmbed()
           .setTitle('HELP')
           .setURL('https://discord.gg/HfkfcMS')
           .setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
            .setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
            .setTimestamp()
            .setColor('RANDOM');
        const botMessage = await message.reply(embed1);
        ReactionCollector.menu({ botMessage, user: message.author, pages });
    }
    });
client.login(client.config.TOKEN);