import { createReadStream } from 'fs'
import { setStorageFolder, create as createBackup } from 'discord-backup'
import { FRIENDS_GUILD_ID, BACKUPS_CHANNEL_ID } from './ids'
import DiscordClient from './discordClient'
// import getSignedS3Url from './getSignedS3Url'
// import uploadFileToS3 from './uploadFileToS3'
// import sendMessage from './sendMessage'
import { TextChannel, MessageAttachment } from 'discord.js'

const BACKUPS_FOLDER = '/backups/'

// Figure out why this triggers each new restart
export default async function backup(): Promise<string> {
  setStorageFolder(__dirname + '/..' + BACKUPS_FOLDER) // TODO: do I need dirname?

  const guild = await DiscordClient.guilds.fetch(FRIENDS_GUILD_ID, true, true) // TODO: do I need to skip cache or not?
  const backupId = Date.now().toString()

  await createBackup(guild, {
    backupID: backupId,
    // TODO: Figure out how to download all messages without just spamming 9999
    maxMessagesPerChannel: 99999999999999999999999999,
    saveImages: 'base64',
  })

  const fileName = backupId + '.json'
  const fileStream = createReadStream('.' + BACKUPS_FOLDER + fileName)

  // await uploadFileToS3(fileStream, fileName)
  // TODO: just upload this.. it should work. only fallback to s3 if it fails
  // const presignedUrl = await getSignedS3Url(fileName)
  const attachment = new MessageAttachment(fileStream, fileName)

  const channel = guild.channels.cache.get(BACKUPS_CHANNEL_ID) as TextChannel
  channel.send(
    'Here is the latest full server backup for the Friends server. This backup should never be shared with anyone not on the council because it includes all channels. ',
    attachment,
  )

  // await sendMessage(
  //   FRIENDS_GUILD_ID,
  //   BACKUPS_CHANNEL_ID,
  //   'Here is the latest full server backup for the Friends server. This backup should never be shared with anyone not on the council because it includes all channels. ' +
  //     presignedUrl,
  // )

  return Promise.resolve(backupId)
}
