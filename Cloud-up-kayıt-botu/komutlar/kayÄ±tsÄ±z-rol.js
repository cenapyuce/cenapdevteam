const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
var isimm = ayarlar.botisim
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isimm).setDescription(`Bu komutu kullanmak için yetkiniz yok!`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())

 let ROL = message.mentions.roles.first()
 if(!ROL) {
   let hataembed = new Discord.RichEmbed()
   .setColor('2f3136')
   .setTitle(isimm)
   .addField("Bir Rol Etiketlemelisin!") 
   .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
   message.channel.send(hataembed) 
 } else  {
   let rolembed = new Discord.RichEmbed()
   .setColor('2f3136')
      .setTitle(isimm)
   .setDescription("Kayıtsız Rolü başarıyla <@&"+ ROL.id +"> olarak ayarlandı!")
  .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
   message.channel.send(rolembed)
   db.set(`kayıtsız_${message.guild.id}`,ROL.id)
 }
}; //dc baksana

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["man-role", "roleman"],
  permLevel: 0
};
exports.help = {
  name: "kayıtsız-rol",
  description: "",
  usage: ""
};