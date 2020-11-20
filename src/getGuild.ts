import { Guild } from 'discord.js'
import { BotConfig, PRIMARY_BOT } from './config/bots.js'
import { PRODUCTION_GUILD_ID } from './config/guilds.js'
import getDiscordClient from './getClient.js'

// TODO: add support for development environment variable (prod/dev server)
export default async function getGuild(
	botConfig: BotConfig = PRIMARY_BOT,
): Promise<Guild> {
	const client = await getDiscordClient(botConfig)

	return client.guilds.fetch(PRODUCTION_GUILD_ID)
}
