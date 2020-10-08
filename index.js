const Discord = require('discord.js');
const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/backups/");

const client = new Discord.Client({
  presence: {
    activity: { type: 'WATCHING', name: 'the matrix' },
    status: 'online',
    afk: false,
    url: 'https://emma.stebbins.dev/'
  }
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// DigitalOcean Health Check
const express = require('express')
const app = express()
const port = 8080

// TODO: Switch to es6 await syntax
app.get('/', (req, res) => {
  client.guilds.fetch('761254466979889153', true, true)
    .then(guild => {
      console.log(guild);
      backup.create(guild, {
        // TODO: Figure out how to download all messages without just spamming 9999
        maxMessagesPerChannel: 99999999999999999999999999,
        saveImages: "url" //"base64" TODO switch to base64
      }).then((backupData) => {
        console.log(backupData)
        res.send(`Backup created with id ${backupData.id}`);
      })
    })
    .catch(console.error);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
