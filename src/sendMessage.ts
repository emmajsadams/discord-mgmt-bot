import { Message, MessageOptions, TextChannel } from 'discord.js'
import isProduction from './environment/isProduction'

// TODO: Change this to support a channel and message object
// TODO: In dev mode change this to print the message not send it
// TODO: Do I need to return message? Or can I avoid null return somehow
export default async function sendMessage(
	channel: TextChannel,
	messageOptions: MessageOptions,
): Promise<Message | null> {
	if (isProduction()) {
		return channel.send(messageOptions)
	}

	console.info('sendMessage in development')
	console.info(`channelId: ${channel.id}`)
	console.info(JSON.stringify(messageOptions))

	return Promise.resolve(null)
}
