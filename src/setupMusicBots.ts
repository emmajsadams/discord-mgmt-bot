import {
  Client,
  Message,
  VoiceChannel,
  VoiceConnection,
  Channel,
  StreamOptions,
  MessageEmbed,
  StreamDispatcher,
} from 'discord.js'
import { MUSIC_BOT_CHANNEL } from './config/channels'
import ytdl from 'ytdl-core-discord'
import search from 'youtube-search'
import { isWebUri } from 'valid-url'
import { MusicBotMessages } from './createMusicPlayers'
import ytpl from 'ytpl'

interface MusicBotConnection {
  client: Client
  channel: Channel
  connection: VoiceConnection
  queue: string[] // TODO: change this to be videoDetaisl url array for managing queue
  dispatcher: StreamDispatcher
}

interface MusicBotConnections {
  [voiceChannelId: string]: MusicBotConnection
}

const BOT_CONNECTIONS: MusicBotConnections = {}

// TODO: type this
const YOUTUBE_API_OPTS = {
  maxResults: 1,
  key: process.env.YOUTUBE_API_KEY,
}

const STREAM_OPTIONS: StreamOptions = {
  seek: 0,
  volume: 1,
  bitrate: 'auto',
}

async function getYoutubeUrl(query: string): Promise<string[]> {
  if (ytpl.validateID(query)) {
    const playlist = await ytpl(query)
    const youtubeUrls = []
    for (const playListitem of playlist.items) {
      youtubeUrls.push(playListitem.url)
    }

    return Promise.resolve(youtubeUrls)
  }

  if (ytdl.validateURL(query)) {
    return [query]
  }

  if (isWebUri(query)) {
    throw new Error('Invalid url')
  }

  // TODO: only videos, not channels
  const results = (await search(query, YOUTUBE_API_OPTS)).results

  if (results.length === 0) {
    throw new Error('No results')
  }

  return [results[0].link]
}

async function setupBotConnection(
  voiceChannelId: string,
  availableMusicClients: Client[],
): Promise<MusicBotConnection> {
  let musicBotConnection = BOT_CONNECTIONS[voiceChannelId]
  if (!musicBotConnection) {
    const musicBotClient = availableMusicClients.pop()
    const channel = musicBotClient.channels.cache.get(
      voiceChannelId,
    ) as VoiceChannel
    const connection = await channel.join()
    musicBotConnection = {
      client: musicBotClient,
      channel: channel,
      connection: connection,
      queue: [],
      dispatcher: null,
    }
    BOT_CONNECTIONS[voiceChannelId] = musicBotConnection
  }

  return Promise.resolve(musicBotConnection)
}

// TODO: move message updating in here
async function queueSong(
  youtubeUrl: string,
  voiceChannelId: string,
  availableMusicClients: Client[],
): Promise<void> {
  const musicBotConnection = BOT_CONNECTIONS[voiceChannelId]

  // if there is an active music bot connection simply push to the queue
  if (musicBotConnection.dispatcher) {
    musicBotConnection.queue.push(youtubeUrl)
    return
  }

  const dispatcher = BOT_CONNECTIONS[voiceChannelId].connection.play(
    await ytdl(youtubeUrl),
    { type: 'opus', bitrate: 'auto' },
  )

  musicBotConnection.dispatcher = dispatcher

  dispatcher.on('speaking', async (value) => {
    if (value) {
      return
    }

    dispatcher.destroy() // TODO do I need to call this
    if (musicBotConnection.queue.length > 0) {
      const nextYoutubeUrl = BOT_CONNECTIONS[voiceChannelId].queue.shift()
      musicBotConnection.dispatcher = null
      await queueSong(nextYoutubeUrl, voiceChannelId, availableMusicClients)
    } else {
      delete BOT_CONNECTIONS[voiceChannelId]
      musicBotConnection.connection.disconnect()
      availableMusicClients.push(musicBotConnection.client)
    }
  })
}

async function queueSongs(
  message: Message,
  youtubeUrls: string[],
  musicBotMessages: MusicBotMessages,
  availableMusicClients: Client[],
  musicBotConnection: MusicBotConnection,
): Promise<void> {
  for (const youtubeUrl of youtubeUrls) {
    const youtubeInfo = await ytdl.getBasicInfo(youtubeUrl)
    const voiceChannelId = message.member.voice.channel.id
    await queueSong(youtubeUrl, voiceChannelId, availableMusicClients)

    const musicBotMessage = musicBotMessages[musicBotConnection.client.user.id]
    // TODO: add fields for author/title etc..
    const messageEmbed = new MessageEmbed()
      .setTitle(youtubeInfo.videoDetails.title)
      .setColor('GREEN')
    await musicBotMessage.edit(musicBotConnection.queue.join('\n'), {
      embed: messageEmbed,
    })
  }
}

// NOTE: returns false if not a music bot command, returns true if a music bot command (may or may not have succeeded)
// TODO: try out this https://www.npmjs.com/package/ytdl-core-discord
// TODO: deafen all bots automatically
// TODO: put a slow mode on the music bot channel? or handle queueing multiple
export default async function setupMusicBots(
  musicBotMessages: MusicBotMessages,
  availableMusicClients: Client[],
  message: Message,
): Promise<boolean> {
  if (message.channel.id !== MUSIC_BOT_CHANNEL) {
    return Promise.resolve(false)
  }

  const query = message.cleanContent.trim()

  // TODO: post history in another channel (query, url, requestor)
  await message.delete()

  let youtubeUrls: string[]
  try {
    youtubeUrls = await getYoutubeUrl(query)
  } catch (error) {
    return Promise.resolve(true)
  }

  const voiceChannelId = message.member.voice.channel.id
  const musicBotConnection = await setupBotConnection(
    voiceChannelId,
    availableMusicClients,
  )

  await queueSongs(
    message,
    youtubeUrls,
    musicBotMessages,
    availableMusicClients,
    musicBotConnection,
  )

  return Promise.resolve(true)
}
