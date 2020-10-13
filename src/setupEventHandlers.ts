import DiscordClient from './discordClient'
import autorole from './autorole'
import { EMMA_PRAY_EMOJI, FRIENDS_GUILD_ID } from './ids'
import CACHED_MESSAGES from './cachedMessages'
import getSimpleCommandReply from './getSimpleCommandReply'
import getBotCommand from './getBotCommand'
import getGPTReply from './getGPTReply'
import filterMessage from './filterMessage'
import updateReactionRole from './updateReactionRole'

export default function setupEventHandlers() {
  DiscordClient.on('ready', async () => {
    console.log(`Logged in as ${DiscordClient.user.tag}!`)
    const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID)

    // Cache all messages
    for (const channelId in CACHED_MESSAGES) {
      const channel = await guild.channels.cache.get(channelId)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'messages' does not exist on type 'GuildC... Remove this comment to see the full error message
      await channel.messages.fetch(CACHED_MESSAGES[channelId])
    }

    console.log('Messages cached')
  })

  DiscordClient.on('messageReactionAdd', async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, true)
  })

  DiscordClient.on('messageReactionRemove', async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, false)
  })

  DiscordClient.on('guildMemberAdd', async (member) => {
    await autorole(member)
  })

  DiscordClient.on('message', async (message) => {
    const filterReason = filterMessage(message.content)
    if (filterReason) {
      message.delete({ reason: filterReason })
      message.reply(filterReason)
    }

    const botCommand = getBotCommand(message.content)
    if (!botCommand) {
      return
    }

    // React to signify the bot is processing a command
    message.react(EMMA_PRAY_EMOJI)

    let reply = getSimpleCommandReply(message.author.id, botCommand)
    if (reply) {
      message.reply(reply)
      return
    }

    reply = await getGPTReply(botCommand)
    if (reply) {
      message.reply(reply)
      return
    }

    message.reply(
      "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
    )
  })
}
