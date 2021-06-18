//By NightcoreAT#3678
exports.run = (client, msg) => { //This command starts from here
    msg.channel.send(`:game_die: **${msg.author.username}**, you rolled a **${Math.floor(Math.random() * 100) + 1}**!`);
}

//While we gave the bot the value from 1 to 100, it will randomly choose the numbers from 1 to 100 and you can adjust the value as you like

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], //optional as you know
  permLevel: 0
};

module.exports.help = {
  name: "roll"
};
//By NightcoreAT#3678
