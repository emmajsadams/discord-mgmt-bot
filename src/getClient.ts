import { Client, Snowflake } from 'discord.js'
import { BotConfig } from './config/bots.js'

// TODO: store this on the BotConfig instead potentially
const cachedDiscordClients = new Map<Snowflake, Client>()

export default async function getClient(botConfig: BotConfig): Promise<Client> {
	let discordClient = cachedDiscordClients.get(botConfig.id)
	if (discordClient) {
		return discordClient
	}

	// TODO: client options and setup autoreconnect if I too https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
	// NOTE: discord client manages automatically retrying and reconnecting.
	discordClient = new Client({
		retryLimit: 3,
		presence: botConfig.presence,
	})

	// TODO: do I need to wait for ready? or is waiting for login enough
	await discordClient.login(botConfig.token)
	cachedDiscordClients.set(botConfig.id, discordClient)

	// Update username from server
	botConfig.username = discordClient.user.username

	return discordClient
}
