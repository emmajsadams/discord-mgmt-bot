import { ACQUAINTANCE_ROLE } from './ids'

export default async function autorole(member) {
  await member.roles.add(ACQUAINTANCE_ROLE, 'Auto role')
}
