const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Snowflake = require("snowflake-api");
client.db = require("quick.db");
const prefix = require('discord-prefix');
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
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

});
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


client.login(client.config.TOKEN);