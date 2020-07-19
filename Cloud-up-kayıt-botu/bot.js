const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[Sistem] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//
//client.on("userUpdate", async(old, rm, message) => {
  
  

  //let tag = await db.fetch(`tag_${message.guild.id}`);
  
 // let rolid = await db.fetch(`ototagrol_${message.guild.id}`);
  
 // let kanal = await db.fetch(`ototagkanal_${message.guild.id}`)
  
  
  //if(old.username !== rm.username) {
 // if(!rm.username.includes(tag) && client.members.get(rm.id).roles.has(rolid)) {
   //  client.members.get(rm.id).removeRole(rolid)
   //  client.channels.get(kanal).send(`${client.emojis.get("727631897005523034")} **${rm}, tagımızı çıkardığı için <@&727534506071949326> rolü alındı!**`)
   // } 
    
  //   if(rm.username.includes(tag) && !client.members.get(rm.id).roles.has(rolid)) {
   //   client.channels.get(kanal).send(`${client.emojis.get("727609579000561776")} **${rm}, tagımızı aldığı için <@&727534506071949326> rolü verildi!**`) 
   //    client.members.get(rm.id).addRole(rolid)
   //  }
  //}
  //})



//client.on('userUpdate', async (oldUser, newUser) => {
  
  //var tag =  db.get(`sunucutag_${oldUser.guild.id}`);
 
 //var rol = db.get(`ekiprol_${oldUser.guild.id}`)
 //var log = db.get(`ekipkanal_${oldUser.guild.id}`)
 
 //var kisi = oldUser.guild.member(newUser)
 
//if(oldUser.username != newUser.username) {
  
//if(newUser.username.includes(tag) && !kisi.roles.has(rol.id)) {
//await kisi.addRole(rol)
//await kisi.send(`Hey ${kisi}, tagımızı aldığın için teşekkür ederim umarım sunucuda iyi vakit geçirirsin.`)
//await client.channels.get(log).send(`${kisi} tagımızı alarak aramıza katıldı!`)  
//} else {
//await kisi.removeRole(rol) 
//await kisi.send(`Hey ${kisi} Görünüşe göre tagımızı salmışsın. Senden ekip rolünü aldım.`)  
//  await client.channels.get(log).send(`${kisi} tagımızı çıkarttığın için biraz üzüldüm, iyi günler dilerim`)    
//}}});


///giriş-mesaj

client.on("guildMemberAdd", member => {
  
  const kanal = db.get(`girişkanal_${member.guild.id}`)
  
  const mesaj = db.get(`girişmesaj_${member.guild.id}`)
  
  const kayıtçı = db.get(`kayıtçı_${member.guild.id}`)
  
  client.channels.get(kanal).send(mesaj ? mesaj.replace('-kullanıcı-', `${member}`) .replace('-üyesayısı-', `${member.guild.memberCount}`).replace('-sunucuadı-', `${member.guild.name}`) .replace('-kayıtçı-', `<@&${kayıtçı}>`) : `__**${member.guild.name}**__\n\n${member} **Sunucuya Hoşgeldin, Seninle birlikte** __**${member.guild.memberCount}**__ **kişiyiz.**\n\n**Kayıt Olmak İçin Soldaki Odalardan Birine Giriş Yapabilirsiniz.**\n\n**Sizinle <@&${kayıtçı}> Rolündeki Yetkililerimiz İlgilenicektir.**`)
})


//oto isim sistem

/*client.on("guildMemberAdd", async member => {
  let tag = await db.fetch(`otoisim_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`);
  else tagyazi = member.setNickname(`${tag} ${member.user.username}`);
});
*/
//ototag


//reklam engel


///////////////////////////Reklam koruması///////
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`) 
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                   
                    let embed = new Discord.RichEmbed()
                    .setColor('RED')
                    .setFooter(`🎈 ${client.user.username}`, client.user.avatarURL)
                    .setAuthor(client.user.username, client.user.avatarURL)
                    .setDescription(`Reklam Yapan : <@${msg.author.id}>\nID: ${msg.author.id}`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/647315021122240512/690962562665414686/dd1c2a5879b9fdf216efd473c74aaaf8.png")
                    .addField('Engellenen Mesaj : ', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`<@${msg.author.id}>, bu sunucuda reklam yapamazsın, istersen tekrar dene!`).then(msg => msg.delete(25000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
  });
//////////////////////////