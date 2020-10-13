import {
  PRONOUN_MESSAGE_ID,
  COOMER_MESSAGE_ID,
  TABLETOP_MESSAGE_ID,
  MINECRAFT_MESSAGE_ID,
  MENS_LIBERATION_MESSAGE_ID,
  FRIENDS_GUILD_ID,
} from './ids'
import DiscordClient from './discordClient'

// TODO: create constants out of these question mark?
// TODO: add support for guild specific emojis
// messageId: { emojiId: roleId }
const messageToRoleReactionDict = {
  // pronouns menu
  [PRONOUN_MESSAGE_ID]: {
    '❤️': '761759013699584000', // she/her
    '💙': '761759091034030114', // he/him
    '💜': '761759137645330504', // they/them
    '💛': '761759183963947008', // ask my pronouns
  },
  [COOMER_MESSAGE_ID]: {
    '🍑': '762104511396446218',
  },
  [TABLETOP_MESSAGE_ID]: {
    '🎲': '762503582787829780',
  },
  [MINECRAFT_MESSAGE_ID]: {
    '⛏️': '762934755770630166',
  },
  [MENS_LIBERATION_MESSAGE_ID]: {
    '🚹': '764740026591346688',
  },
}

// TODO: consider separate add and remove function
// addRole: true add role, false remove role
export default async function updateReactionRole(
  messageReaction,
  user,
  addRole,
) {
  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID)

  const messageId = messageReaction.message.id

  const roleReaction = messageToRoleReactionDict[messageId]
  if (!roleReaction) {
    return null
  }

  const emojiId = messageReaction.emoji.name
  const roleId = roleReaction[emojiId]
  if (!roleId) {
    return null
  }

  const userRoles = guild.member(user).roles
  if (addRole) {
    await userRoles.add(roleId, 'Reaction role')
  } else {
    await userRoles.remove(roleId, 'Reaction role')
  }

  return roleId
}
