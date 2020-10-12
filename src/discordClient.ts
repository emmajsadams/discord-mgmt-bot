import { Client } from 'discord.js'

// TODO: Change status to be something clever about learning to become human
// TODO: Use a separate call to update presence
// TODO: client options and setup autoreconnect if I too https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
// NOTE: discord client manages automatically retrying and reconnecting.
const DiscordClient = new Client({
  presence: {
    activity: { type: 'WATCHING', name: 'the matrix' },
    status: 'online',
    afk: false,
  },
  retryLimit: 3,
})

DiscordClient.login(process.env.DISCORD_BOT_TOKEN)

export default DiscordClient