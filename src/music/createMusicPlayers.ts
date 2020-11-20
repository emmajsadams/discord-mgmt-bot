import { Message, MessageEmbed, Snowflake, TextChannel } from 'discord.js'
import { BotConfig, SECONDARY_BOTS } from '../config/bots.js'
import getTextChannel from '../getTextChannel.js'

export interface MusicBotMessages {
	[musicBotUserId: string]: Message
}

async function getOrCreateMessage(
	musicBotConfig: BotConfig,
	musicChannel: TextChannel,
): Promise<Message> {
	const messages = (await musicChannel.messages.fetch()).array()
	for (const message of messages) {
		if (musicBotConfig.id === message.author.id) {
			return message
		}
	}

	// TODO: add fields for author/title etc..
	const messageEmbed = new MessageEmbed()
		.setTitle('No song playing currently')
		.setColor('GREEN')

	const message = await musicChannel.send('', {
		embed: messageEmbed,
	})

	// pause
	await message.react('⏯️')

	// stop
	await message.react('⏹️')

	// skip
	await message.react('⏭️')

	// TODO: do I need this? was from hydra
	// await message.react('🔂')

	// TODO: do I need this? was from hydra
	// await message.react('🔀')

	// clear queue
	await message.react('❌')

	return message
}

export default async function createMusicPlayers(
	musicChannelId: Snowflake,
): Promise<MusicBotMessages> {
	const musicBotMessages: MusicBotMessages = {}
	for (const musicBotClient of SECONDARY_BOTS) {
		const musicChannel = await getTextChannel(musicChannelId, musicBotClient)
		musicBotMessages[musicBotClient.id] = await getOrCreateMessage(
			musicBotClient,
			musicChannel,
		)
	}

	return Promise.resolve(musicBotMessages)
}
