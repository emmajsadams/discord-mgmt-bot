import { Message } from 'discord.js'

export default function getMessageLink(message: Message): string {
	return `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
}
