import DiscordClient from './discordClient'
import sendMessage from './sendMessage'
import { isObjectLike, isEmpty } from 'lodash'
import { FRIENDS_GUILD_ID, MOD_LOG_CHANNEL_ID, PUBLIC_LOG_CHANNEL_ID, ADMIN_LOG_CHANNEL_ID } from './ids'

// TODO: warn for new accounts
const memberEventNames = ['guildMemberAdd', 'guildMemberRemove']
// TODO: Figure out how to handle attachments?
const messageEventNames = ['messageDelete', 'messageDeleteBulk', 'messageUpdate']

const loggingChannels = [MOD_LOG_CHANNEL_ID, PUBLIC_LOG_CHANNEL_ID, ADMIN_LOG_CHANNEL_ID]
const administratorChannels = [
  '764415739423096832', // #council-backups
  '761323976303050802', // #council-chat
  '763170044984688640', // #cuties-chat
  '763182857555673089', // #cuties-nsfw
]

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
const blacklistedZeroPrintProperties = ['flags', 'editedTimestamp', 'createdTimestamp']

// TODO: look up cahnnel and
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
      if (!channelBlacklist && !channelWhitelist) {
        for (const arg in args) {
          const channelId = arg['channelId']

          if (channelBlacklist && channelBlacklist.includes(channelId)) {
            return
          }

          if (channelWhitelist && !channelWhitelist.includes(channelId)) {
            return
          }
        }
      }

      console.log(loggingChannelId)
      await sendMessage(FRIENDS_GUILD_ID, loggingChannelId, printEvent(eventName, args))
    })
  }
}

// Message schema - https://discord.com/developers/docs/resources/channel#message-object
export default function setupEventHandlersForLogging(): void {
  setupEventHandlers(memberEventNames, PUBLIC_LOG_CHANNEL_ID, null, null)
  setupEventHandlers(messageEventNames, MOD_LOG_CHANNEL_ID, loggingChannels.concat(administratorChannels), null)
  setupEventHandlers(messageEventNames, ADMIN_LOG_CHANNEL_ID, null, administratorChannels)
}
