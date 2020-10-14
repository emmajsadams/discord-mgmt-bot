import { Snowflake, PresenceData } from 'discord.js'

// NOTE: bots cannot have custom statuses https://discord.js.org/#/docs/main/stable/typedef/ActivityType
export interface UserConfig {
  id: Snowflake
  name: string
  presence: PresenceData
  token: string
}

// TODO: investigate a way to make this less guild specific?
export const EMMA_BOT: UserConfig = {
  id: '763599207294173234',
  name: 'EmmaBot',
  presence: {
    activity: { type: 'WATCHING', name: 'human behavior' },
    status: 'online',
    afk: false,
  },
  token: process.env.EMMA_BOT_TOKEN,
}

export const VITO_BOT: UserConfig = {
  id: '765309391762882570',
  name: 'VitoBot',
  presence: {
    activity: { type: 'PLAYING', name: 'Order 66' },
    status: 'online',
    afk: false,
  },
  token: process.env.VITO_BOT_TOKEN,
}

// TODO: randomly ping people as fun command
export const SID_BOT: UserConfig = {
  id: '765662681733529612',
  name: 'SidBot',
  presence: {
    activity: { type: 'WATCHING', name: 'footie' },
    status: 'online',
    afk: false,
  },
  token: process.env.SID_BOT_TOKEN,
}

export const FITZ_BOT: UserConfig = {
  id: '765664903192641588',
  name: 'FitzBot',
  presence: {
    activity: { type: 'WATCHING', name: 'the fall of England' },
    status: 'online',
    afk: false,
  },
  token: process.env.FITZ_BOT_TOKEN,
}

export const TREE_BOT: UserConfig = {
  id: '765667194058047528',
  name: 'TreeBot',
  presence: {
    activity: { type: 'LISTENING', name: 'to obscure music' },
    status: 'online',
    afk: false,
  },
  token: process.env.TREE_BOT_TOKEN,
}

export const SECONDARY_BOTS = [VITO_BOT, SID_BOT, FITZ_BOT, TREE_BOT]

export const MUSIC_BOTS = [VITO_BOT, SID_BOT, FITZ_BOT, TREE_BOT]

export const BOTS = SECONDARY_BOTS.concat([EMMA_BOT])
