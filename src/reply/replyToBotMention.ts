import { Message } from 'discord.js'
import { BotConfig } from '../config/bots.js'
import { ChannelsFilterType, LOGGING_CHANNELS } from '../config/channels.js'
import getBotCommand from './getBotCommand.js'
import getGPTReply from './getGPTReply.js'
import getSimpleCommandReply from './getSimpleCommandReply.js'

export default async function replyToBotMention(
	botConfig: BotConfig,
	message: Message,
): Promise<boolean> {
	const botCommand = getBotCommand(
		message,
		botConfig,
		LOGGING_CHANNELS,
		ChannelsFilterType.Deny,
	)
	if (!botCommand) {
		return false
	}

	// React to signify the bot is processing a command
	// TODO: change this to be in user config
	await message.react(botConfig.processingEmoji)

	let reply = getSimpleCommandReply(message.author.id, botCommand)
	if (reply) {
		await message.reply(reply)
		return
	}

	reply = await getGPTReply(botCommand)
	if (reply) {
		await message.reply(reply)
		return
	}

	await message.reply(
		"I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
	)

	return true
}
