module.exports.run = (client, message, args) => {
number = 13;
        imageNumber = Math.floor (Math.random() * number) + 1;
        message.channel.send ({files: ["./images/" + imageNumber + ".png"]})
    } 

module.exports.help = {
    name: "dinosaur"
};