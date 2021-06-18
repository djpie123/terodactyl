const Discord = require('discord.js')
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let premium = '759040185404096552' || "801002672718479360"
  if (message.guild.id !== premium){
    return message.channel.send(`This is a premium command please get and retry _https://terodactyl.repl.co/premium.html_`)
  }
 let cArgs = args[0] 
 try{
    db.set(`${message.guild.id}`, cArgs)
        message.channel.send("done")
 }catch(e){
console.log(e)
    return message.channel.send("Please provide a valid image url")
 }
}

module.exports.help = {
    name: "setw-card"
  }
