const eventHandlerNames = [
  'channelCreate',
  'channelDelete',
  'channelPinsUpdate',
  'channelUpdate',
  'debug',
  'emojiCreate',
  'emojiDelete',
  'emojiUpdate',
  'error',
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
  'invalidated',
  'inviteCreate',
  'inviteDelete',
  'message',
  'messageDelete',
  'messageDeleteBulk',
  'messageReactionAdd',
  'messageReactionRemove',
  'messageReactionRemoveAll',
  'messageReactionRemoveEmoji',
  'messageUpdate',
  'presenceUpdate',
  'rateLimit',
  'ready',
  'roleCreate',
  'roleDelete',
  'roleUpdate',
  'shardDisconnect',
  'shardError',
  'shardReady',
  'shardReconnecting',
  'shardResume',
  'typingStart',
  'userUpdate',
  'voiceStateUpdate',
  'warn',
  'webhookUpdate',
]

export default function setupEventHandlersForLogging() {
  for (const eventHandlerName in eventHandlerNames) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'DiscordClient'.
    DiscordClient.on(eventHandlerName, async (...args: any[]) => {
      console.log('foo')
    })
  }
}
