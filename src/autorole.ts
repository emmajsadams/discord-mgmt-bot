import { GuildMember, Snowflake } from 'discord.js'

export default async function autorole(
  member: GuildMember,
  roleId: Snowflake,
): Promise<GuildMember> {
  return member.roles.add(roleId, 'Autorole on join')
}
