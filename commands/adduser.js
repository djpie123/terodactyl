
  module.exports.run = (client, message, args, cdb) => {
        if (message.author.id !== '706714852571348993') {
            return message.channel.send(`You cannot use this command!`)
        }
        cdb.set("users", args[0]).then(
         message.channel.send(`successfully added user <@${args[0]}>`)
        ) 
    }

module.exports.help = {
    name: "adduser"
};