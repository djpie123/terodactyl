const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cat",
    category: "animals",
    run: async (client, message, args) => {
        const url = "https://dinosaurpictures.org/random";
        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Cat Image and Fact`)
            .setColor(`#f3f3f3`)
            .setImage(image.link)

        await message.channel.send(embed)
    }
}
module.exports.help = {
    name: "dino"
};