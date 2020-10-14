import { Client, Message } from 'discord.js'
import { MUSIC_BOT_CHANNEL } from './config/channels'
import ytdl from 'ytdl-core'

// TODO: setup await messges for channel instead of message listener
// TODO: setup system for checking if a bot is already active in any other channel
// TODO: disconnect bot after done playing
// TODO: deafen all bots
// TODO: queue up playlists for bot in existing channel
export default function setupMusicBots(musicBotClients: Client[]): void {
  for (const musicBotClient of musicBotClients) {
    musicBotClient.on('message', async (message: Message) => {
      if (message.channel.id !== MUSIC_BOT_CHANNEL) {
        return
      }

      const streamOptions = { seek: 0, volume: 1 }
      const voiceChannel = message.member.voice.channel

      if (!voiceChannel) {
        // Not in a voice channel
        // todo: notify user in some way??
        return
      }

      // TODO: catch errors and do something????
      const connection = await voiceChannel.join()

      // TODO: setup some sort of search system in youtube
      const stream = ytdl(message.cleanContent.trim(), {
        filter: 'audioonly',
      })

      const dispatcher = connection.play(stream, streamOptions)
      dispatcher.on('end', (end) => {
        // TODO: only leave here if there is no queue
        voiceChannel.leave()
      })

      await message.delete()
    })
  }
}
