import DiscordClient from './discordClient'
import sendMessage from './sendMessage'
import { FRIENDS_GUILD_ID, LOG_CHANNEL_ID } from './ids'

// TODO: see if api can get this list of events so it updates with api
const eventHandlerNames = [
  'channelCreate',
  'channelDelete',
  'channelPinsUpdate',
  'channelUpdate',
  'emojiCreate',
  'emojiDelete',
  'emojiUpdate',
  'error', // TODO: figure out how to handle this
  'guildBanAdd',
  'guildBanRemove',
  'guildCreate',
  'guildDelete',
  'guildIntegrationsUpdate',
  'guildMemberAdd',
  'guildMemberRemove',
  'guildMembersChunk',
  'guildMemberSpeaking',
  'guildMemberUpdate',
  'guildUnavailable',
  'guildUpdate',
  'invalidated', // TODO: figure out how to handle this
  'inviteCreate',
  'inviteDelete',
  'messageDelete',
  'messageDeleteBulk',
  'messageReactionAdd',
  'messageReactionRemove',
  'messageReactionRemoveAll',
  'messageReactionRemoveEmoji',
  'messageUpdate',
  // 'rateLimit', // TODO: figure out how to handle this
  'roleCreate',
  'roleDelete',
  'roleUpdate',
  'shardDisconnect',
  'shardError',
  'shardReconnecting',
  'shardResume',
  'userUpdate',
  'warn',
  'webhookUpdate',
  'voiceStateUpdate',
]

// TODO: these are events crate far too much spam and are not useful except for debugging. Maybe keep track of them somewhere else? or a spam channel?
// 'typingStart'
// 'shardReady', TODO: handle this separate, more debugging info
// 'presenceUpdate',
// 'message',  TODO: figure out how to exclude channels
// 'debug',
// 'ready',

// TODO: may need black list by event..... could be tricky with replacer... maybe need to bind eventName to its
// TODO: do I need message TYPE? what are the types
// TODO: blacklist url for invites since it pops up in the logs, and id is enough
const blackListedProperties = [
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

  // friends guild specific config
  'tts', // tts disabled in friends guild
]

const blackListedChannels = [
  '765005154377400350', // emmabot -> log
]

// TODO: convert timestamps to to human readable formats
// TODO: hide empty properties
// TODO: make flags human readable? or just link to docs?
// TODO: show emoji in discord
function replacer(name, val) {
  if (blackListedProperties.includes(name)) {
    return undefined
  }

  // hide empty properties that aren't expl
  if (!val && val !== false) {
    return undefined
  }

  return val
}

export default function setupEventHandlersForLogging(): void {
  for (const eventHandlerName of eventHandlerNames) {
    DiscordClient.on(eventHandlerName, async (...args: any[]) => {
      // TODO: ensure all events have channelId
      for (const arg in args) {
        if (arg && blackListedChannels.includes(arg['channelId'])) {
          return
        }
      }

      // Note ignore all voice state updates that are not join and leave
      // TODO: log when sver mut, deafens, or admin moves happen
      if (eventHandlerName == 'voiceStateUpdate') {
        const before = args[0]
        const after = args[1]

        if (before['channel'] == after['channel']) {
          return
        }
      }

      // TODO: get guild id from args instead of using only friends guild id (ensure all events have guildId)
      // TODO: separate logging for council specific channels like cuties and council-chat
      // TODO: separate message logs into a different channel for homies and above
      // TODO: log full events somewhere else like S3 or database...consider commented out events as well
      // TODO: consider attaching images and attachments to each message?? worry about size limits...
      // TODO: consider creating mapping of event to argument name??
      await sendMessage(
        FRIENDS_GUILD_ID,
        LOG_CHANNEL_ID,
        eventHandlerName + '\n```\n' + JSON.stringify(args, replacer, 2) + '\n```',
      )
    })
  }
}
