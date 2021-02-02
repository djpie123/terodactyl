const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Snowflake = require("snowflake-api");
client.db = require("quick.db");
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = {
    TOKEN: process.env.token, //Discord Bot Token
    API_TOKEN: "NzA2NzE0ODUyNTcxMzQ4OTkz.MTYxMTg0MTM1NjY2Nw==.0150d78f668cc42489fc333cb2a73811", //API Token found at http://api.snowflakedev.cf:9019/dashboard
    prefix: "*",
    cooldown: 0
};
const api = new Snowflake.Client(client.config.API_TOKEN);
client.snowapi = api;

// Load Commands
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

client.login(client.config.TOKEN);