const { reconDB } = require("reconlx");
const db = new reconDB({
    uri: process.env.url,
  });
  module.exports.run = (client, message, args) => {
        if (message.author.id !== '706714852571348993') {
            return message.channel.send(`You cannot use this command!`)
        }
        db.set("users", args(1)).then(
         message.channel.send(`successfully added user <@${args(1)}>`)
        ) 
    }

module.exports.help = {
    name: "adduser"
};