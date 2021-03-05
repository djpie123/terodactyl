const db = require("quick.db")
module.exports = {
    name: "restart",
    category: "owner",
    run: async (client, message, args) => {
        if (message.author.id !== '706714852571348993') {
            return message.channel.send(`You cannot use this command!`)
        }
         db.set(`users`, args[0]);
            message.channel.send(`sucessfully added user <@${args[0]}>`)
        
    }
}
module.exports.help = {
    name: "adduser"
};