import { TextChannel } from 'discord.js'
import reactionRoles from '../config/reactionRoles.js'
import getGuild from '../getGuild.js'

export default async function setupReactionRoleMenus(): Promise<void> {
  const guild = await getGuild()
  // cache reaction role menus
  for (const channelId of Object.keys(reactionRoles)) {
    const channel = (await guild.channels.resolve(channelId)) as TextChannel

    for (const messageId of Object.keys(reactionRoles[channelId])) {
      await channel.messages.fetch(messageId)
    }
  }

  // TODO: add reactions to each message with bot, and restrict adding reactions from others
}
