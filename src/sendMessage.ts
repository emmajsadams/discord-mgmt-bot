import DiscordClient from './discordClient'
import { TextChannel, Message } from 'discord.js'

// TODO: change this to use message object
export default async function sendMessage(
  guildId: string,
  channelId: string,
  messageContent: string,
): Promise<Message> {
  const guild = await DiscordClient.guilds.fetch(guildId)
  const channel = guild.channels.cache.get(channelId) as TextChannel

  return channel.send(messageContent)
}
