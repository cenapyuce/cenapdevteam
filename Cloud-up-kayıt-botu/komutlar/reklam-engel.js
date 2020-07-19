const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Bu komutu kullanmak için yetkiniz yok!`).setColor('2f3136'));
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(``)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
  message.channel.send(`Reklam Engel sistemi aktif edildi! \n Birde söylemek istedim logları sunucu sahibine yolluyo demedi deme.`)

  }

  if (args[0] == 'kapat') {
      
    db.delete(`reklamFiltre_${message.guild.id}`)
    
    message.channel.send(`Reklam Engel sistemi kapatıldı!`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['reklam', 'anti-add', 'reklamfiltresi', 'reklam-filtre', 'reklamfiltre','reklam-engel'],
 permLevel: 0
};

exports.help = {
 name: 'anti-link',
 description: 'reklamm',
 usage: 'komut + kanal'
};