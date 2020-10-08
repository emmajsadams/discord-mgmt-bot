const Discord = require('discord.js');
const backup = require("discord-backup");

backup.setStorageFolder(__dirname+"/backups/");
const backupOptions = {
  // TODO: Figure out how to download all messages without just spamming 9999
  maxMessagesPerChannel: 99999999999999999999999999,
  saveImages: "base64" //"base64" TODO switch to base64
}

const client = new Discord.Client({
  presence: {
    activity: { type: 'WATCHING', name: 'the matrix' },
    status: 'online',
    afk: false,
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

app.get('/', async (req, res) => {
  res.send({ success: true, message: "Backup started in background, check server ./backups for json file" });
  const guild = await client.guilds.fetch('761254466979889153', true, true);
  console.log(guild);
  const backupData = await backup.create(guild, backupOptions);
  console.log(backupData.id);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
