const DiscordClient = require("./discordClient");
const autorole = require("./autorole");
const { EMMA_PRAY_EMOJI, FRIENDS_GUILD_ID } = require("./ids");
const CACHED_MESSAGES = require("./cachedMessages");
const getSimpleCommandReply = require("./getSimpleCommandReply");
const getBotCommand = require("./getBotCommand");
const getGPTReply = require("./getGPTReply");
const filterMessage = require("./filterMessage");
const updateReactionRole = require("./updateReactionRole");

const setupEventHandlers = () => {
  DiscordClient.on("ready", async () => {
    console.log(`Logged in as ${DiscordClient.user.tag}!`);
    const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID);

    // Cache all messages
    for (const channelId in CACHED_MESSAGES) {
      const channel = await guild.channels.cache.get(channelId);
      await channel.messages.fetch(CACHED_MESSAGES[channelId]);
    }

    console.log("Messages cached");
  });

  DiscordClient.on("messageReactionAdd", async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, true);
  });

  DiscordClient.on("messageReactionRemove", async (messageReaction, user) => {
    await updateReactionRole(messageReaction, user, false);
  });

  DiscordClient.on("guildMemberAdd", async (member) => {
    await autorole(member);
  });

  DiscordClient.on("message", async (message) => {
    const filterReason = filterMessage(message.content);
    if (filterReason) {
      message.delete({ reason: filterReason });
      message.reply(filterReason);
    }

    const botCommand = getBotCommand(message.content);
    if (!botCommand) {
      return;
    }

    // React to signify the bot is processing a command
    message.react(EMMA_PRAY_EMOJI);

    let reply = getSimpleCommandReply(message.author.id, botCommand);
    if (reply) {
      message.reply(reply);
      return;
    }

    reply = await getGPTReply(botCommand);
    if (reply) {
      message.reply(reply);
      return;
    }

    message.reply(
      "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s"
    );
  });

  DiscordClient.on("messageReactionAdd", async (message) => {});
};

module.exports = setupEventHandlers;
