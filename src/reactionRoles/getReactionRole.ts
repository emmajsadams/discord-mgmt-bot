import { Snowflake } from 'discord.js'
import REACTION_ROLES from '../config/reactionRoles'

export default function getReactionRole(
  channelId: Snowflake,
  messageId: Snowflake,
  emojiId: Snowflake,
): Snowflake {
  const roleReactionChannel = REACTION_ROLES[channelId]
  if (!roleReactionChannel) {
    return null
  }

  const roleReaction = roleReactionChannel[messageId]
  if (!roleReaction) {
    return null
  }

  const roleId = roleReaction[emojiId]
  if (!roleId) {
    return null
  }

  return roleId
}
