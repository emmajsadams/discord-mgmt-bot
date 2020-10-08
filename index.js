const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: { type: 'WATCHING', name: 'the matrix' },
    status: 'online',
    afk: false,
    url: 'https://emma.stebbins.dev/'
  }).then(console.log)
    .catch(console.error);
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
