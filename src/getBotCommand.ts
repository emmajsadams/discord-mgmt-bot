import { Message, Snowflake } from 'discord.js'
import { UserConfig } from './config/users'
import { ChannelsFilterType } from './config/channels'
import filterChannel from './filterChannel'

// TODO: figure out why mentions still broke
// TODO: return cleanCommand and mentioned specific command
export default function getBotCommand(
  message: Message,
  botConfig: UserConfig,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): string {
  if (filterChannel(message.channel.id, channels, channelsFilterType)) {
    return ''
  }

  let messageContent = message.cleanContent

  // Remove at mention symbol to allow text or mention syntax
  if (messageContent[0] === '@') {
    messageContent = messageContent.substring(1)
  }

  if (!messageContent.startsWith(botConfig.name)) {
    return ''
  }

  return messageContent.substring(`${botConfig.name} `.length)
}
