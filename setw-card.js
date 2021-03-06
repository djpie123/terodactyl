setw-card
const Discord = require('discord.js')
const db = require("quick.db")
const Canvas = require("canvas")
const { registerFont, createCanvas } = require('canvas')
registerFont('./Roboto-Regular.ttf', { family: 'Roboto' })
module.exports.run = async (client, message, args) => {
  let premium = '759040185404096552'
  if (message.guild.id !== premium){
    return message.channel.send(`This is a premium command please get and retry _https://terodactyl.repl.co/premium.html_`)
  }
 let cArgs = args[0]
 const member = message.author
 const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(cArgs);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px "Roboto"';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Member #${message.guild.memberCount}`;
      ctx.font = 'bold 60px "Roboto"';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `${message.guild.name}`;
      ctx.font = 'bold 60px "Roboto"';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      
 try{
    db.set(`${message.guild.id}`, cArgs).then(
        channel.send(attachment)
    )
 }catch(e){
    return message.channel.send("Please provide a valid image url")
 }
}
