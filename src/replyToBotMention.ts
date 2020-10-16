import getSimpleCommandReply from './getSimpleCommandReply'
import getBotCommand from './getBotCommand'
import getGPTReply from './getGPTReply'
import { EMMA_PRAY_EMOJI } from './ids'
import { LOGGING_CHANNELS, ChannelsFilterType } from './config/channels'
import { Message } from 'discord.js'
import { UserConfig } from './config/users'

export default async function replyToBotMention(
  botConfig: UserConfig,
  message: Message,
): Promise<boolean> {
  const botCommand = getBotCommand(
    message,
    botConfig,
    LOGGING_CHANNELS,
    ChannelsFilterType.Deny,
  )
  if (!botCommand) {
    return false
  }

  // React to signify the bot is processing a command
  // TODO: change this to be in user config
  await message.react(EMMA_PRAY_EMOJI)

  let reply = getSimpleCommandReply(message.author.id, botCommand)
  if (reply) {
    await message.reply(reply)
    return
  }

  reply = await getGPTReply(botCommand)
  if (reply) {
    await message.reply(reply)
    return
  }

  await message.reply(
    "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
  )

  return true
}
