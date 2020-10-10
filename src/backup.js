const DiscordBackup = require("discord-backup");

const { FRIENDS_GUILD_ID } = require("./ids");
const DiscordClient = require("./discordClient");

DiscordBackup.setStorageFolder(__dirname + "/../backups/");

const backupOptions = {
  // TODO: Figure out how to download all messages without just spamming 9999
  maxMessagesPerChannel: 99999999999999999999999999,
  saveImages: "base64",
};

const backup = async () => {
  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID, true, true);
  await DiscordBackup.create(guild, backupOptions);
};

module.exports = backup;
