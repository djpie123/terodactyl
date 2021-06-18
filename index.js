const Discord = require("discord.js");
const client = new Discord.Client
const path = require('path');
client.db = require("quick.db");
const Canvas = require("canvas");
const { registerFont, createCanvas } = require('canvas')
registerFont('./Roboto-Black.ttf', { family: 'Roboto' })
const fs = require("fs");
const Snowflake = require("snowflake-api");
const prefix = require('discord-prefix');
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
const DisTube = require('distube')
const fetch = require('node-fetch').default;
const {GiveawayCreator} = require('discord-giveaway');
const Creator = new GiveawayCreator(client, "mongo url");
client.giveaways = Creator
client.config = {
    TOKEN: "token", //Discord Bot Token
     prefix: "*",
   cooldown: 0
};
const welcome = require("./welcome");
welcome(client);
const distube = new DisTube(client, {searchSongs: true, emitNewSongOnly: true, highWaterMark: 1<<25})
const filters = ["3d","bassboost","echo","karaoke","nightcore","vaporwave","flanger"]
this.client = client;
// Events
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error("err");
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
    });
});
this.client = client;
client.once("ready", () => {

    client.user.setActivity(`*help in ${this.client.guilds.cache.size} servers || type *invite to invite`, {
        type: "PLAYING", browser: "DISCORD IOS"  
      });

    console.log("Ready!");
});
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
  const chan = client.db.get(`channel_${message.guild.id}`)
if(chan == null){
try{
message.guild.channels.cache.get(message.guild.systemChannelID).send('chatbot channel is not set type "*chatbot channel id" to set chatbot channel or use "*chatbot off" to turn it off')
}catch(e){
}
}
if(chan == ("off" || "Off" || "OFF")){
client.db.set(`channel_${message.guild.id}`, "839852664262623264")
}
    if(message.channel.id === chan){
	fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
   .then(response => response.json())
   .then(data =>{
   message.channel.send(`${message.author}, ${data.response}`)
    })
  }
   let guildPrefix = prefix.getPrefix(message.guild.id);
   if (!guildPrefix) guildPrefix = client.config.prefix;
    // Handle XP
    xp(message);
    // command handler
    if (!message.content.startsWith(guildPrefix)) return;
    let args = message.content.slice(guildPrefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) return;
    commandFile.run(client, message, args);
});
function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let xp = client.db.add(`${message.guild.id}xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`${message.guild.id}level_${message.author.id}`) || client.db.set(`${message.guild.id}level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`${message.guild.id}level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`).then(m => m.delete({ timeout: 5000 }));
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
   let guildPrefix = prefix.getPrefix(message.guild.id);
   if (!guildPrefix) guildPrefix = client.config.prefix;
    // Handle XP
    xp(message);
    // command handler
    if (!message.content.startsWith(guildPrefix)) return;
    let args = message.content.slice(guildPrefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();

    if(command === "ping"){
        return embedbuilder(client, message, `RANDOM`, `PING:`, `\`${client.ws.ping} ms\``)
    }
if(command === "play" || command === "p"){
        embedbuilder(client, message, "YELLOW", "Searching!", args.join(" "))
        return distube.play(message, args.join(" "));
    }
    if(command === "skip" || command === "s"){
        embedbuilder(client, message, "YELLOW", "SKIPPED!", `Skipped the song`, "https://i.imgur.com/msgNNqN.gif")
        return distube.skip(message);
    } 
    if(command === "stop" || command === "leave"){
        embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`)
        return distube.stop(message);
    }
if(command === "pause"){
        embedbuilder(client, message, "RED", "PAUSED", `paused the song`)
        return distube.pause(message);
    } 
if(command === "resume"){
        embedbuilder(client, message, "GREEN", "GOIN ONNNNN!", `resumed`, "https://i.imgur.com/msgNNqN.gif")
        return distube.resume(message);
    } 
    if(command === "seek"){
        embedbuilder(client, message, "GREEN", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
        return distube.seek(message, Number(args[0]*1000));
    } 
    if(filters.includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "YELLOW", "Adding filter!", filter, "https://i.imgur.com/msgNNqN.gif")
    }
    if(command === "volume" || command == "vol"){
        
        embedbuilder(client, message, "GREEN", "VOLUME!", `changed volume to \`${args[0]} %\``, "https://i.imgur.com/msgNNqN.gif")
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

})

//queue
const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
//distube
distube
     .on("playSong", async (message, queue, song) => {
embedbuilder(client, message, "GREEN", "Playing new Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n${status(queue)}`, "https://i.imgur.com/msgNNqN.gif")
     })
     .on("addSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Added a Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`, "https://i.imgur.com/msgNNqN.gif")
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
function embedbuilder(client, message, color, title, description, image){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
if(image) embed.setImage(image);
    return message.channel.send(embed);
}
client.on('guildCreate', async  guild => {
let invite = await guild.systemChannel.createInvite(
  {
    maxAge: 604800, // maximum time for the invite, in milliseconds
    maxUses: 100 // maximum times it can be used
 });
const i = invite.code
const info = new Discord.MessageEmbed()
.setTitle(guild.name)
           .setURL(`https://discord.gg/${i}`)
           .setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
		   .setDescription("I got added in a new server")
            .setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
            .setTimestamp()
            .setColor('RANDOM');
const web = new Discord.WebhookClient("channel id", "webhook token");
  const joinemebd = new Discord.MessageEmbed()
           .setTitle('WEBSITE')
           .setURL('https://terodactyl.repl.co')
           .setAuthor('Terodactyl#6714', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5OI1Ao0e2dJmvAhXcE_A9tMj14ittIq_wQ&usqp=CAU' )
		   .setDescription("Hi this is terodactyl thanku for adding me to your server please get the premium on the website provided above to use cool functins such as custom ranks cards and welcome cards and also premium is 100% free for this bot")
.addField("Some settings you can make :-", `1)chatbot channel is not set type "*chatbot channel id" to set chatbot channel or use "*chatbot off" to turn it off \n 2)You can set welcome channel by typing "*welcomechannel channel id" or "welcomechannel dm" or to turn it off again "*welcomechannel off". It is off by default (this is under maintainence join the support server to know more - https://discord.gg/Hfem6FbVgQ)`, true)
            .setFooter('THIS BOT IS MADE BY PIE IS LIVE 💕|| ')
            .setTimestamp()
            .setColor('RANDOM');
try{
   let ch = await guild.channels.cache.get(guild.systemChannelID).send(`<@${guild.ownerID}>`)
guild.channels.cache.get(guild.systemChannelID).send(joinemebd)
web.send({
	embeds: [info],
});
   }catch(e){
}
});
client.login(client.config.TOKEN);