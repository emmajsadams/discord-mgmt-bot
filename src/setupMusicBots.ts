import { Client, Message } from 'discord.js'
import { MUSIC_BOT_CHANNEL } from './config/channels'
import ytdl from 'ytdl-core'

// TODO: disconnect bot after done playing
// TODO: deafen all bots
// TODO: queue up playlists for bot in existing channel
export default async function setupMusicBots(
  availableMusicClients: Client[],
  message: Message,
): Promise<boolean> {
  const voiceChannelId = message.member.voice.channel.id

  if (voiceChannelId !== MUSIC_BOT_CHANNEL) {
    return Promise.resolve(false)
  }

  // TODO: Check if any other bot client
  const musicBotClient = availableMusicClients.pop()
  const broadcast = await musicBotClient.voice.createBroadcast()

  // TODO: setup some sort of search system in youtube
  const stream = ytdl(message.cleanContent.trim(), {
    filter: 'audioonly',
  })

  const dispatcher = broadcast.play(stream, { seek: 0, volume: 1 })
  dispatcher.on('end', (end) => {
    // TODO: only leave here if there is no queue
    broadcast.end()

    for (const voiceConnection of musicBotClient.voice.connections.array()) {
      voiceConnection.disconnect()
    }
  })

  await message.delete()

  return Promise.resolve(true)
}
