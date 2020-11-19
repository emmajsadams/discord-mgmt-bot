import backup from 'discord-backup'
import { Guild, MessageAttachment, TextChannel } from 'discord.js'
import {
	BackupData,
	TextChannelData,
	VoiceChannelData,
} from '../node_modules/discord-backup/lib/types'
import {
	ADMIN_BACKUPS_CHANNEL_ID,
	MOD_BACKUPS_CHANNEL_ID,
	PUBLIC_BACKUPS_CHANNEL_ID,
} from './config/channels.js'
import getGuild from './getGuild.js'

// TODO: move these to channels config and consolidate with other config objects
const BLACKLISTED_CHANNELS = [
	'council-backups',
	'mod-backups',
	'council-backups',
	'academia-mod-chat',
]
const HOMIE_BLACKLISTED_CHANNELS = [
	'council-chat',
	'cuties-chat',
	'cuties-vent',
	'cuties-nsfw',
	'cuties-applications',
	'cuties-vc',
	'council-logs',
	'community-updates',
]
const PUBLIC_BLACKLISTED_CHANNELS = [
	'homie-chat',
	'mod-vc',
	'new-account-warnings',
	'mod-logs',
]

async function sendBackup(
	guild: Guild,
	backupChannelId: string,
	backupData: BackupData,
	fileName: string,
): Promise<void> {
	const attachment = new MessageAttachment(JSON.stringify(backupData), fileName)
	const channel = guild.channels.cache.get(backupChannelId) as TextChannel
	await channel.send(
		'Here is the latest full server backup for the Friends server.',
		attachment,
	)
}

// TODO: fix this since it seeems to cause out of memory errors
function filterBackupInPlace(
	backupData: BackupData,
	blacklistedChannels: string[],
): void {
	for (const category of backupData.channels.categories) {
		console.log(category)
		const filteredChildren: (VoiceChannelData | TextChannelData)[] = []
		for (const channel of category.children) {
			if (!blacklistedChannels.includes(channel.name)) {
				filteredChildren.push(channel)
			}
		}
		category.children = filteredChildren
	}
}

// TODO: rename file to match function
export default async function backupToDiscord(): Promise<string> {
	const guild = await getGuild()
	const backupId = Date.now().toString()
	const backupData = await backup.create(guild, {
		backupID: backupId,
		jsonSave: false,
		// TODO: Figure out how to download all messages without just spamming 9999
		maxMessagesPerChannel: 99999999999999999999999999,
		saveImages: 'base64',
	})

	filterBackupInPlace(backupData, BLACKLISTED_CHANNELS)
	await sendBackup(
		guild,
		ADMIN_BACKUPS_CHANNEL_ID,
		backupData,
		`${backupId}-council.json`,
	)

	filterBackupInPlace(
		backupData,
		BLACKLISTED_CHANNELS.concat(HOMIE_BLACKLISTED_CHANNELS),
	)
	await sendBackup(
		guild,
		MOD_BACKUPS_CHANNEL_ID,
		backupData,
		`${backupId}-homie.json`,
	)

	filterBackupInPlace(
		backupData,
		BLACKLISTED_CHANNELS.concat(
			HOMIE_BLACKLISTED_CHANNELS,
			PUBLIC_BLACKLISTED_CHANNELS,
		),
	)
	await sendBackup(
		guild,
		PUBLIC_BACKUPS_CHANNEL_ID,
		backupData,
		`${backupId}-public.json`,
	)

	return Promise.resolve(backupId)
}
