const eventHandlerNames = [
  "channelCreate",
  "channelDelete",
  "channelPinsUpdate",
  "channelUpdate",
  "debug",
  "emojiCreate",
  "emojiDelete",
  "emojiUpdate",
  "error",
  "guildBanAdd",
  "guildBanRemove",
  "guildCreate",
  "guildDelete",
  "guildIntegrationsUpdate",
  "guildMemberAdd",
  "guildMemberRemove",
  "guildMembersChunk",
  "guildMemberSpeaking",
  "guildMemberUpdate",
  "guildUnavailable",
  "guildUpdate",
  "invalidated",
  "inviteCreate",
  "inviteDelete",
  "message",
  "messageDelete",
  "messageDeleteBulk",
  "messageReactionAdd",
  "messageReactionRemove",
  "messageReactionRemoveAll",
  "messageReactionRemoveEmoji",
  "messageUpdate",
  "presenceUpdate",
  "rateLimit",
  "ready",
  "roleCreate",
  "roleDelete",
  "roleUpdate",
  "shardDisconnect",
  "shardError",
  "shardReady",
  "shardReconnecting",
  "shardResume",
  "typingStart",
  "userUpdate",
  "voiceStateUpdate",
  "warn",
  "webhookUpdate",
];

const setupEventHandlersForLogging = () => {
  for (const eventHandlerName in eventHandlerNames) {
    DiscordClient.on(eventHandlerName, async (...arguments) => {
      await updateReactionRole(messageReaction, user, true);
    });
  }
};

module.exports = setupEventHandlersForLogging;
