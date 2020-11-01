import { MessageReaction, Snowflake } from 'discord.js'
import getGuild from '../getGuild.js'
import getReactionRole from './getReactionRole.js'

// TODO: consider separate add and remove function
// addRole: true add role, false remove role
export default async function updateReactionRole(
  messageReaction: MessageReaction,
  user,
  addRole, // TODO: Change this to enum
): Promise<Snowflake | null> {
  const roleId = getReactionRole(
    messageReaction.message.channel.id,
    messageReaction.message.id,
    messageReaction.emoji.id,
  )

  if (!roleId) {
    return null
  }

  const guild = await getGuild()
  const userRoles = (await guild.member(user)).roles
  if (addRole) {
    await userRoles.add(roleId, 'Reaction role')
  } else {
    await userRoles.remove(roleId, 'Reaction role')
  }

  return roleId
}
