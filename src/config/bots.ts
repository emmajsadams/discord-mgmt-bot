import { PresenceData, Snowflake } from 'discord.js'

// NOTE: Bots cannot have custom statuses https://discord.js.org/#/docs/main/stable/typedef/ActivityType
// They must have a specified type restricted to a limited set
// NOTE: The names of each bot config variable do not matter. They are never exported and referenced in code. It is just to help
// the server owner/bot
export interface BotConfig {
	id: Snowflake
	presence: PresenceData
	token: string
	processingEmoji: Snowflake

	// NOTE: these are updated when the client is retrieved. They do not need to be configured thus are left as empty string by default
	username: string
	tag: string
}

export const DEFAULT_PROCESSING_EMOJI = '🤖'

const TOGUSA_BOT: BotConfig = {
	id: '770120138481336320',
	presence: {
		activity: { type: 'WATCHING', name: 'investigation progress' },
		status: 'online',
		afk: false,
	},
	token: process.env.TOGUSA_BOT_TOKEN,
	processingEmoji: DEFAULT_PROCESSING_EMOJI,
	username: '',
	tag: '',
}

const BATOU_BOT: BotConfig = {
	id: '768227786698522625',
	presence: {
		activity: { type: 'WATCHING', name: 'for intruders' },
		status: 'online',
		afk: false,
	},
	token: process.env.BATOU_BOT_TOKEN,
	processingEmoji: DEFAULT_PROCESSING_EMOJI,
	username: '',
	tag: '',
}

const ISHIKAWA_BOT: BotConfig = {
	id: '770122080175128586',
	presence: {
		activity: { type: 'WATCHING', name: 'the logs' },
		status: 'online',
		afk: false,
	},
	token: process.env.ISHIKAWA_BOT_TOKEN,
	processingEmoji: DEFAULT_PROCESSING_EMOJI,
	username: '',
	tag: '',
}

// Handles all administrative tasks and dispatches SECONDARY_BOTS for various tasks
export const PRIMARY_BOT = TOGUSA_BOT

// Currently only dispatched by the primary bot to play music in channels.
export const SECONDARY_BOTS = [BATOU_BOT, ISHIKAWA_BOT]

// All bots managed by this code
export const BOTS = SECONDARY_BOTS.concat([PRIMARY_BOT])
