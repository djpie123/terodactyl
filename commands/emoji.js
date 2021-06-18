module.exports.run = async (client, message, args) => {
 let permission = message.member.hasPermission("MANAGE_EMOJI");

if(!permission) return message.channel.send("You are missing the permission `MANAGE EMOJI`")

 let cArgs = args[0]
	 
 try{
   let emoji = await message.guild.emojis.create(`${cArgs}`, `${args[1]}`)
   message.channel.send(`added new emoji : ${emoji}`)
return;
 }catch(e){
  message.channel.send("image exceeds 256.0 kb or error")
	
 }
  }
module.exports.help = {
        name: "upload_emote"
      }