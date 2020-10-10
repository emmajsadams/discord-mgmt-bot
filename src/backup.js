const DiscordBackup = require("discord-backup");

const { FRIENDS_GUILD_ID } = require("./ids");
const DiscordClient = require("./discordClient");

const backup = async () => {
  DiscordBackup.setStorageFolder(__dirname + "/../backups/");

  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID, true, true);

  const backupData = await DiscordBackup.create(guild, {
    backupID: Date.now().toString(),
    // TODO: Figure out how to download all messages without just spamming 9999
    maxMessagesPerChannel: 99999999999999999999999999,
    saveImages: "base64",
  });

  return backupData;
};

module.exports = backup;
