const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
number = 13;
        imageNumber = Math.floor (Math.random() * number) + 1;
        const embed  = new MessageEmbed()
        .setAuthor("HERE'S YOUR DINOSAUR")
        .setImage({files: ["./images/" + imageNumber + ".png"]})
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send (embed)
    } 

module.exports.help = {
    name: "dinosaur"
};