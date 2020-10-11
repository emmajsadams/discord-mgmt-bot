const DiscordClient = require("./discordClient");
const autorole = require("./autorole");
const { EMMA_PRAY_EMOJI } = require("./ids");
const getSimpleCommandReply = require("./getSimpleCommandReply");
const getBotCommand = require("./getBotCommand");
const getGPTReply = require("./getGPTReply");
const filterMessage = require("./filterMessage");

const setupEventHandlers = () => {
  // Only needed for debugging could remove
  DiscordClient.on("ready", () => {
    console.log(`Logged in as ${DiscordClient.user.tag}!`);
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
};

module.exports = setupEventHandlers;
