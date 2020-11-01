import { GuildMember } from 'discord.js'
import autorole from './autorole.js'
import { PRIMARY_BOT } from './config/bots.js'
import { MUSIC_QUEUE_CHANNEL_ID } from './config/channels.js'
import { EVERYONE_ROLE } from './config/roles.js'
import isDisabled from './environment/isDisabled.js'
import filterMessageFromConfig from './filterMessageFromConfig.js'
import getPrimaryClient from './getPrimaryClient.js'
import setupLogging from './logging/setupLogging.js'
import createMusicPlayers from './music/createMusicPlayers.js'
import setupMusicBots from './music/setupMusicBots.js'
import updateReactionRole from './reactionRoles/updateReactionRole.js'
import replyToBotMention from './reply/replyToBotMention.js'

// TODO: change this to be something about setup all bots
export default async function setupPrimaryBot(): Promise<void> {
  const primaryClient = await getPrimaryClient()

  // Reaction roles
  if (!isDisabled('reaction_roles')) {
    primaryClient.on('messageReactionAdd', async (messageReaction, user) => {
      await updateReactionRole(messageReaction, user, true)
    })
    primaryClient.on('messageReactionRemove', async (messageReaction, user) => {
      await updateReactionRole(messageReaction, user, false)
    })
  }

  // Autorole
  if (!isDisabled('autorole')) {
    primaryClient.on('guildMemberAdd', async (member) => {
      await autorole(member as GuildMember, EVERYONE_ROLE)
    })
  }

  // TODO: type this
  let musicBotMessages
  if (!isDisabled('music')) {
    musicBotMessages = await createMusicPlayers(MUSIC_QUEUE_CHANNEL_ID)
  }

  primaryClient.on('message', async (message) => {
    const filterReason = filterMessageFromConfig(message)
    if (filterReason) {
      message.delete({ reason: filterReason })
      message.reply(filterReason)
      return
    }

    if (
      !isDisabled('music') &&
      (await setupMusicBots(musicBotMessages, message))
    ) {
      return
    }

    if (
      !isDisabled('replies') &&
      (await replyToBotMention(PRIMARY_BOT, message))
    ) {
      return
    }

    console.info(`message ${message.id} was not actionable`)
  })

  if (!isDisabled('logging')) {
    setupLogging()
  }

  return Promise.resolve()
}
