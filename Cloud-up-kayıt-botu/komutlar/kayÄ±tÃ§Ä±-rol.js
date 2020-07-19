const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
var isim = ayarlar.botisim
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isim).setDescription(`Bu komudu kullanmak için yetkiniz yok!`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())
 let ROL = message.mentions.roles.first()
 if(!ROL) {
   let hataembed = new Discord.RichEmbed()
   .setColor('2f3136')
   .setTitle(isim)
   .setDescription("Bir Rol Etiketlemelisin!") 
   .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
   message.channel.send(hataembed) 
 } else  {
   let rolembed = new Discord.RichEmbed()
   .setColor('2f3136')
      .setTitle(isim)
   .setDescription("Kayıtçı Rolü başarıyla <@&"+ ROL.id +"> olarak ayarlandı!")
  .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
   message.channel.send(rolembed)
   db.set(`kayıtçı_${message.guild.id}`,ROL.id)
 }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtcı-rol"],
  permLevel: 0
};
exports.help = {
  name: "kayıtçı-rol",
  description: "",
  usage: ""
};