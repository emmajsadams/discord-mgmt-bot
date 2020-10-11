const fs = require("fs");
const DiscordBackup = require("discord-backup");

const { FRIENDS_GUILD_ID } = require("./ids");
const DiscordClient = require("./discordClient");
const uploadFileToS3 = require("./uploadFileToS3");

// figure out how to handle movies
const backup = async () => {
  DiscordBackup.setStorageFolder(__dirname + "/../backups/"); // TODO: do I need dirname?

  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID, true, true); // TODO: do I need to skip cache or not?
  const backupId = Date.now().toString();

  await DiscordBackup.create(guild, {
    backupID: backupId,
    // TODO: Figure out how to download all messages without just spamming 9999
    maxMessagesPerChannel: 99999999999999999999999999,
    saveImages: "base64",
  });

  var fileStream = fs.createReadStream("./backups/" + backupId + ".json");
  await uploadFileToS3(fileStream, backupId + ".json");

  return backupId;
};

module.exports = backup;
