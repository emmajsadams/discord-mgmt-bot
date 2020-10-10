const Discord = require('discord.js')

// TODO: Change status to be something clever about learning to become human
// TODO: Use a separate call to update prescence
const DiscordClient = new Discord.Client({
  presence: {
    activity: { type: 'WATCHING', name: 'the matrix' },
    status: 'online',
    afk: false,
  }
});

DiscordClient.login(process.env.DISCORD_BOT_TOKEN);

module.exports = DiscordClient
