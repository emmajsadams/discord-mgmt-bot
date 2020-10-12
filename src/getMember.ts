import DiscordClient from './discordClient'
import { GuildMember, Snowflake } from 'discord.js'

export default async function getMember(guildId: Snowflake, memberId: Snowflake): Promise<GuildMember> {
  const guild = await DiscordClient.guilds.fetch(guildId)

  return await guild.members.fetch(memberId)
}
