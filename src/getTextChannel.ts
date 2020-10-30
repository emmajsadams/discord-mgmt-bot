import { Snowflake, TextChannel } from 'discord.js'
import { BotConfig, PRIMARY_BOT } from './config/bots'
import getGuild from './getGuild'

// TODO: add support for development environment variable (prod/dev server)
// TODO: do I want a generic getChannel or textchannel? Do I validate if textchannel or not
// TODO: accept a Guild object instead of botconfig!
export default async function getTextChannel(
  channelId: Snowflake,
  botConfig: BotConfig = PRIMARY_BOT,
): Promise<TextChannel> {
  const guild = await getGuild(botConfig)

  return Promise.resolve(guild.channels.resolve(channelId) as TextChannel)
}
