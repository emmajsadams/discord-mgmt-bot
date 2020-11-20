import { Message, Snowflake } from 'discord.js'
import { BotConfig } from '../config/bots.js'
import { ChannelsFilterType } from '../config/channels.js'
import filterMessageByChannel from '../filterMessageByChannel.js'

// TODO: change this to filterBotCommand???
// TODO: figure out why mentions still broke
export default function getBotCommand(
	message: Message,
	botConfig: BotConfig,
	channels: Snowflake[],
	channelsFilterType: ChannelsFilterType,
): string {
	if (
		filterMessageByChannel(message.channel.id, channels, channelsFilterType)
	) {
		return ''
	}

	let messageContent = message.cleanContent

	// Remove at mention symbol to allow text or mention syntax
	if (messageContent[0] === '@') {
		messageContent = messageContent.substring(1)
	}

	if (!messageContent.startsWith(botConfig.username)) {
		return ''
	}

	return messageContent.substring(`${botConfig.username} `.length)
}
