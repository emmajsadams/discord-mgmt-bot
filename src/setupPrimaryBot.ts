import EmmaBotClient from './discordClient'
import autorole from './autorole'
import { FRIENDS_GUILD_ID } from './ids'
import { MUSIC_BOT_CHANNEL } from './config/channels'

import CACHED_MESSAGES from './cachedMessages'
import { Client } from 'discord.js'

import filterMessage from './filterMessage'
import updateReactionRole from './updateReactionRole'
import { EMMA_BOT, SECONDARY_BOTS } from './config/users'
import getDiscordClient from './getDiscordClient'
import setupMusicBots from './setupMusicBots'
import replyToBotMention from './replyToBotMention'
import setupLogging from './setupLogging'
import createMusicPlayers from './createMusicPlayers'
import pify from 'pify'
import isDisabled from './isDisabled'

// TODO: change this to be something about setup all bots
export default async function setupPrimaryBot() {
  // Setup secondary bots
  const secondaryClients: Client[] = []
  const onReadyPromises: Promise<void>[] = [
    pify(EmmaBotClient.on.bind(EmmaBotClient))('ready'),
  ]
  for (const botConfig of SECONDARY_BOTS) {
    const discordClient = getDiscordClient(botConfig)
    discordClient.on('ready', () => {
      discordClient.user.setPresence(botConfig.presence)
    })
    secondaryClients.push(discordClient)
  }

  for (const secondaryClient of secondaryClients) {
    onReadyPromises.push(
      pify(secondaryClient.on.bind(secondaryClient))('ready'),
    )
  }

  await Promise.all(onReadyPromises)

  const musicBotMessages = await createMusicPlayers(
    secondaryClients,
    FRIENDS_GUILD_ID,
    MUSIC_BOT_CHANNEL,
  )

  // Create copy of secondary bots array that can be modified and treated as a stack
  const availableMusicClients = secondaryClients.map((client) => client)

  console.log(`Logged in as ${EmmaBotClient.user.tag}!`)
  EmmaBotClient.user.setPresence(EMMA_BOT.presence)
  const guild = await EmmaBotClient.guilds.fetch(FRIENDS_GUILD_ID)

  // Cache all messages
  for (const channelId in CACHED_MESSAGES) {
    const channel = await guild.channels.cache.get(channelId)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'messages' does not exist on type 'GuildC... Remove this comment to see the full error message
    await channel.messages.fetch(CACHED_MESSAGES[channelId])
  }

  EmmaBotClient.on('messageReactionAdd', async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, true)
  })

  EmmaBotClient.on('messageReactionRemove', async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, false)
  })

  EmmaBotClient.on('guildMemberAdd', async (member) => {
    await autorole(member)
  })

  EmmaBotClient.on('message', async (message) => {
    const filterReason = filterMessage(message.content)
    if (filterReason) {
      message.delete({ reason: filterReason })
      message.reply(filterReason)
    }

    if (
      !isDisabled('music') &&
      (await setupMusicBots(musicBotMessages, availableMusicClients, message))
    ) {
      return
    }
  })

  if (!isDisabled('logging')) {
    setupLogging()
  }
}
