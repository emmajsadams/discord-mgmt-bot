import { Client, Message, VoiceChannel } from 'discord.js'
import { MUSIC_BOT_CHANNEL } from './config/channels'
import ytdl from 'ytdl-core'
import search from 'youtube-search'
import validUrl from 'valid-url'

const opts = {
  maxResults: 1,
  key: process.env.YOUTUBE_API_KEY,
}

async function getYoutubeUrl(query: string): Promise<string> {
  if (validUrl(query) && !ytdl.validateURL(query)) {
    throw new Error('Invalid url')
  }

  const results = (await search(query, opts)).results

  if (results.length === 0) {
    throw new Error('No results')
  }

  return results[0].link
}

// TODO: disconnect bot after done playing
// TODO: deafen all bots
// TODO: queue up playlists for bot in existing channel
// TODO: try out this https://www.npmjs.com/package/ytdl-core-discord
export default async function setupMusicBots(
  allMusicBots: Client[],
  availableMusicClients: Client[],
  message: Message,
): Promise<boolean> {
  if (message.channel.id !== MUSIC_BOT_CHANNEL) {
    return Promise.resolve(false)
  }

  // Check if any other bot client is in the channel
  const voiceChannelId = message.member.voice.channel.id
  for (const musicBot of allMusicBots) {
    for (const connection of musicBot.voice.connections.array()) {
      if (connection.channel.id === voiceChannelId) {
        return false
      }
    }
  }

  let youtubeUrl: string
  try {
    youtubeUrl = await getYoutubeUrl(message.cleanContent.trim())
  } catch (error) {
    // TODO: actually display this error somewhere?
    console.log(error)
    return true
  }

  const musicBotClient = availableMusicClients.pop()
  const channel = musicBotClient.channels.cache.get(
    voiceChannelId,
  ) as VoiceChannel

  const connection = await channel.join()
  const stream = ytdl(youtubeUrl, {
    filter: 'audioonly',
  })
  const dispatcher = connection.play(stream, { seek: 0, volume: 1 })

  dispatcher.on('end', () => {
    dispatcher.end()
    connection.disconnect()
    availableMusicClients.push(musicBotClient)
  })

  await message.delete()

  return Promise.resolve(true)
}
