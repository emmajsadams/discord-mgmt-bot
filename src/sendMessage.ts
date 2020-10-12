import DiscordClient from './discordClient'
import { TextChannel, Message } from 'discord.js'

export default async function sendMessage(
  guildId: string,
  channelId: string,
  messageContent: string,
): Promise<Message> {
  // TODO: get guilds and cache at start..
  const guild = await DiscordClient.guilds.fetch(guildId)
  const channel = guild.channels.cache.get(channelId) as TextChannel

  return channel.send(messageContent)
}
