import {
  MOD_LOG_CHANNEL_ID,
  PUBLIC_LOG_CHANNEL_ID,
  ADMIN_LOG_CHANNEL_ID,
} from '../ids'

export enum ChannelsFilterType {
  Allow,
  Deny,
}

export const NEW_ACCOUNT_WARNINGS = '765451731479822406'

export const MUSIC_BOT_CHANNEL = '765726873568673823'

// TODO: move rest of channels to this config file
export const IGNORED_CHANNELS = [
  '761261936343777313', // # hydra-song-requests,
  MUSIC_BOT_CHANNEL,
]

export const BACKUP_CHANNELS = [
  '765692417168113684', // #public-backups
  '765692392899870731', // #mod-backups
  '764415739423096832', // #council-backups
]

export const LOGGING_CHANNELS = [
  MOD_LOG_CHANNEL_ID,
  PUBLIC_LOG_CHANNEL_ID,
  ADMIN_LOG_CHANNEL_ID,
  NEW_ACCOUNT_WARNINGS,
  '761255427877896213', // #server-boosts
]

export const ADMIN_CHANNELS = [
  '764415739423096832', // #council-backups
  '761323976303050802', // #council-chat
  '763170044984688640', // #cuties-chat
  '763182857555673089', // #cuties-nsfw
  '765306977185169410', // #cuties-applications
]
