const fs = require("fs");
const DiscordBackup = require("discord-backup");

const { FRIENDS_GUILD_ID } = require("./ids");
const DiscordClient = require("./discordClient");
const getSignedS3Url = require("./getSignedS3Url");

const BACKUPS_FOLDER = "/backups/";

// figure out how to handle movies
const backup = async () => {
  DiscordBackup.setStorageFolder(__dirname + "/.." + BACKUPS_FOLDER); // TODO: do I need dirname?

  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID, true, true); // TODO: do I need to skip cache or not?
  const backupId = Date.now().toString();

  await DiscordBackup.create(guild, {
    backupID: backupId,
    // TODO: Figure out how to download all messages without just spamming 9999
    maxMessagesPerChannel: 99999999999999999999999999,
    saveImages: "base64",
  });

  const fileName = backupId + ".json";
  const fileStream = fs.createReadStream("." + BACKUPS_FOLDER + fileName);
  await uploadFileToS3(fileStream, fileName);

  const presignedUrl = await getSignedS3Url();

  //TODO: make this guild specific
  guild.channels.cache
    .get("764415739423096832")
    .send(
      "Here is the latest full server backup for the Friends server. This backup should never be shared with anyone not on the council because it includes all channels. " +
        presignedUrl
    );

  return backupId;
};

module.exports = backup;
