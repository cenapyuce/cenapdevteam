const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
var isimm = ayarlar.botisim
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isim).setDescription(`Bu komutu kullanmak için yetkiniz yok!`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())
  let member = message.mentions.members.first();
  let isim = args.slice(1).join(" ");
  let yas = args.slice(1).join(" ");
  
  let kayıtçı = message.guild.roles.find(`id`, db.fetch(`kayıtçı_${message.guild.id}`));//kayıtçı rol
  
 if (!message.member.roles.find(`id`, db.fetch(`kayıtçı_${message.guild.id}`))) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isimm).setDescription(`Bu Komutu Komutu Sadece ${kayıtçı} Rolündekiler Kullanabilir!`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())
  
  if (!member) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isimm).setDescription(`Birini Etiketlemelisin`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())
  if (!isim) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle(isimm).setDescription(`Bir isim yazmalısın!`).setColor('2f3136').setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp())
  member.setNickname(`${isim}`);
  let erkek = message.guild.roles.find(`id`, db.fetch(`erkekrol_${message.guild.id}`));  //kayıtsız_$
  let kayıtsız = message.guild.roles.find(`id`, db.fetch(`kayıtsız_${message.guild.id}`)); 
  if(!kayıtsız) {
           let hataembed = new Discord.RichEmbed()
   .setColor('2f3136')
   .setTitle(isimm)
   .addField("Kayıtsız rolü Ayarlanmamış!") 
   .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
        return   message.channel.send(hataembed)
  } else if(!erkek) {
       let hataembed = new Discord.RichEmbed()
   .setColor('2f3136')
   .setTitle(isimm)
   .addField("Erkek rolü Ayarlanmamış!") 
   .setFooter(`${client.user.username}`,`${client.user.avatarURL}`)  .setTimestamp()
       return   message.channel.send(hataembed)
  } else {
const embed = new Discord.RichEmbed()

.setTitle(isimm)
  .setDescription(`${member} adlı kullanıcıya ${erkek} rolü başarıyla verildi!`)
.setFooter(`Kayıt Görevlisi`,`${client.user.avatarURL}`) .setTimestamp()
.setColor('2f3136')
message.channel.send(embed)
    member.addRole(erkek.id)
      member.removeRole(kayıtsız.id)
}};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: ""
};