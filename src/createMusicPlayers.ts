import {
  Client,
  Snowflake,
  TextChannel,
  MessageEmbed,
  Message,
} from 'discord.js'

export interface MusicBotMessages {
  [musicBotUserId: string]: Message
}

async function getMessage(
  channel: TextChannel,
  musicBotClient: Client,
  messages: Message[],
): Promise<Message> {
  for (const message of messages) {
    if (musicBotClient.user.id === message.author.id) {
      return message
    }
  }

  // TODO: add fields for author/title etc..
  const messageEmbed = new MessageEmbed()
    .setTitle('No song playing currently')
    .setColor('GREEN')

  const message = await channel.send('', {
    embed: messageEmbed,
  })

  // TODO: do I even need pause??
  // pause
  await message.react('⏯️')

  // stop
  await message.react('⏹️')

  // skip
  await message.react('⏭️')

  // TODO: change loop mode
  // await message.react('🔂')

  // TODO: shuffle the queue
  // await message.react('🔀')

  // clear queue
  await message.react('❌')

  return message
}

// NOTE: all musicbot clients must be part of the same guild
// TODO: do I need fetch in all these calls
// TODO: update queue
export default async function createMusicPlayers(
  musicBotClients: Client[],
  guildId: Snowflake,
  musicChannelId: Snowflake,
): Promise<MusicBotMessages> {
  const musicBotMessages: MusicBotMessages = {}
  for (const musicBotClient of musicBotClients) {
    const guild = await musicBotClient.guilds.fetch(guildId)
    const channel = (await guild.channels
      .resolve(musicChannelId)
      .fetch(true)) as TextChannel

    // TODO: could potentially reduce complexity, but only 4 messages
    const messages = (await channel.messages.fetch({}, false, true)).array()
    musicBotMessages[musicBotClient.user.id] = await getMessage(
      channel,
      musicBotClient,
      messages,
    )
  }

  return Promise.resolve(musicBotMessages)
}
