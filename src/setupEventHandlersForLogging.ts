import DiscordClient from './discordClient'
import sendMessage from './sendMessage'
import getMember from './getMember'
import { isObjectLike, isEmpty } from 'lodash'
import { FRIENDS_GUILD_ID, MOD_LOG_CHANNEL_ID, PUBLIC_LOG_CHANNEL_ID, ADMIN_LOG_CHANNEL_ID } from './ids'

// Member events that are interesting from a moderation perspective
const memberEventNames = ['guildMemberAdd', 'guildMemberRemove']

// Message events that are interesting from a moderation perspective
const messageEventNames = ['messageDelete', 'messageDeleteBulk', 'messageUpdate']

// Channels that should never be listened to because the content is not interested from a moderation perspective
const ignoredChannels = [
  '761261936343777313', // # hydra-song-requests
]

// Channels focused on logging and thus should not be listened to for message events
const loggingChannels = [MOD_LOG_CHANNEL_ID, PUBLIC_LOG_CHANNEL_ID, ADMIN_LOG_CHANNEL_ID]

// Channels that should only be viewed by those with the administrator role above normal mods
const administratorChannels = [
  '764415739423096832', // #council-backups
  '761323976303050802', // #council-chat
  '763170044984688640', // #cuties-chat
  '763182857555673089', // #cuties-nsfw
]

// Event properties that should never be printed
const blackListedPrintProperties = [
  'guildID', // messages posted in the guild specific log already
  'defaultAvatarURL', // this is the same for all users and does not matter for logging purposes
  'discriminator', // tag and user id make this clear, separate field is unnecessary
  'username', // tag and user id make this clear, separate field is unnecessary
  'avatar', // avatarURl is enough
  'nonce', // only for debugging if the message was correctly sent
  'me', // almost all events will be not bot commands, and userId is enough
  'bot', // almost all events will be not bot commands, and userId is enough
  'lastMessageChannelID', // never necessary since rest of event contains all info
  'avatarURL', // displayAvatarURL is good enough
  'deleted', // Not needed because the event indicates if the message is deleted,
  'tts', // tts is often turned off and not valuable for moderation
  'pinned', // pinned status is tracked by audit log and not valuable for moderation
  'type', // Not important for the events tracked by this bot https://discord.com/developers/docs/resources/channel#message-object-message-types
  'system', // not important for moderation and will not happen given the events tracked
]

// Event properties that should not be printed if the value is zero
const blacklistedZeroPrintProperties = [
  'flags', // 0 just means default message and is not interesting for moderation
  'editedTimestamp', // 0 timestamp means the timestamp does not exist
  'createdTimestamp', // 0 timestamp means the timestamp does not exist
]

function jsonStringifyReplacer(name, val) {
  if (blackListedPrintProperties.includes(name)) {
    return undefined
  }

  if (val === undefined || val == null) {
    return undefined
  }

  if (isObjectLike(val) && isEmpty(val)) {
    return undefined
  }

  if (blacklistedZeroPrintProperties.includes(name) && val === 0) {
    return undefined
  }

  if (name.toLowerCase().endsWith('timestamp')) {
    return new Date(val).toTimeString()
  }

  return val
}

function printEvent(eventName: string, eventArgs: any[]): string {
  return eventName + '\n```\n' + JSON.stringify(eventArgs, jsonStringifyReplacer, 2) + '\n```'
}

// TODO: loook up channel id
// TODO: create special warning channel for new users
// TODO: Figure out how to handle attachments?
// TODO: warn for new accounts
function setupEventHandlers(
  eventNames: string[],
  loggingChannelId: string,
  channelBlacklist: string[] | null,
  channelWhitelist: string[] | null,
) {
  for (const eventName of eventNames) {
    if (channelBlacklist && channelWhitelist) {
      throw new Error('Cannot define whitelist and blacklist')
    }

    DiscordClient.on(eventName, async (...args: any[]) => {
      if (!channelBlacklist || !channelWhitelist) {
        for (const arg in args) {
          const channelId = arg['channelId']
          if (channelBlacklist && channelBlacklist.includes(channelId)) {
            return
          }
          if (channelWhitelist && !channelWhitelist.includes(channelId)) {
            return
          }

          const userId = arg['userID']
          const authorID = arg['authorID']
          if (userId) {
            arg['user'] = await getMember(FRIENDS_GUILD_ID, userId)
            console.log(arg)
          }
          if (authorID) {
            arg['author'] = await getMember(FRIENDS_GUILD_ID, authorID)
            console.log(arg)
          }
        }
      }

      await sendMessage(FRIENDS_GUILD_ID, loggingChannelId, printEvent(eventName, args))
    })
  }
}

// Message schema - https://discord.com/developers/docs/resources/channel#message-object
export default function setupEventHandlersForLogging(): void {
  setupEventHandlers(memberEventNames, PUBLIC_LOG_CHANNEL_ID, null, null) // channel whitelists or blacklists are not needed for member events
  setupEventHandlers(
    messageEventNames,
    MOD_LOG_CHANNEL_ID,
    loggingChannels.concat(administratorChannels, ignoredChannels),
    null,
  )
  setupEventHandlers(messageEventNames, ADMIN_LOG_CHANNEL_ID, null, administratorChannels)
}
