const Discord = require('discord.js');
const backup = require("discord-backup");
const axios = require('axios');

// TODO: add basic authentication to my gpt2 api
const GPT2_API_URL = 'http://34.105.75.35'
const EMMA_USER_ID = '325088597286060044'
const EMMA_BOT_ID = '763599207294173234'

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

// TODO: figure out why message content is inconsisetnt between desktop and mobile
// content: '<@!763599207294173234> tell me something random',
client.on('message', async message => {
  const emmaMentionedUser = message.mentions.users.get(EMMA_BOT_ID);
  const atEmmaBotTextInText = message.content.startsWith('@EmmaBot');
  const emmaBotTextInText = message.content.startsWith('EmmaBot');
  if (!emmaMentionedUser && !atEmmaBotTextInText && !emmaBotTextInText) {
    return;
  }

  const emmaUserAuthor = message.author.id === EMMA_USER_ID;
  message.react(':emmapray:761721006704164874');

  if (message.content.includes('tell me something random')) {
    const response = await axios.get(GPT2_API_URL, { params: { length: 100 }});
    if (response.status !== 200) {
      message.reply('Sorry please try again')
      return
    }
    message.reply(response.data.text);

    return;
  }


  if (message.content.includes('hello')) {
    if (emmaUserAuthor) {
      message.reply('Hello my beautiful queen!');
    } else {
      message.reply('Begone human filth');
    }

    return;
  }

  // figure out embed
  // {
  //   embed: {
  //     url: 'https://youtu.be/ARJ8cAGm6JE?t=59'
  //   }
  // }
  if (emmaUserAuthor) {
    message.reply('My beautiful queen I do not understand!');
  } else {
    message.reply("I'm sorry human filth, I'm afraid I can't do that.")
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// DigitalOcean Health Check
const express = require('express');
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
