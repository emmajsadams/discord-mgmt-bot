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

// TODO: move rest of channels to this config file
export const IGNORED_CHANNELS = [
  '761261936343777313', // # hydra-song-requests
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

  // Historical logging channels'
  '762012046703067176', // #member-logs
  '762012320246792194', // #server-log
  '762025559554654229', // #voice-log
  '762025594006536194', // #join-leave-log
  '761325460666712074', // #historical-logs-from-old-setup
  '762025458153685003', // #message-logs
]

export const ADMIN_CHANNELS = [
  '764415739423096832', // #council-backups
  '761323976303050802', // #council-chat
  '763170044984688640', // #cuties-chat
  '763182857555673089', // #cuties-nsfw
  '765306977185169410', // #cuties-applications
]
