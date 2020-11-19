import { Client } from 'discord.js'
import { PRIMARY_BOT } from './config/bots.js'
import getDiscordClient from './getClient.js'

export default async function getPrimaryClient(): Promise<Client> {
	return getDiscordClient(PRIMARY_BOT)
}
