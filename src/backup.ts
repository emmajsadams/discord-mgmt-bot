import { createReadStream } from 'fs'
import { setStorageFolder, create as createBackup } from 'discord-backup'
import { TextChannel } from 'discord.js'
import { FRIENDS_GUILD_ID } from './ids'
import DiscordClient from './discordClient'
import getSignedS3Url from './getSignedS3Url'
import uploadFileToS3 from './uploadFileToS3'

const BACKUPS_FOLDER = '/backups/'

// figure out how to handle movies
export default async function backup() {
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
  await uploadFileToS3(fileStream, fileName)

  const presignedUrl = await getSignedS3Url(fileName)

  //TODO: make this guild id configurable and a separate function
  const channel = (await guild.channels.cache.get('764415739423096832')) as TextChannel
  channel.send(
    'Here is the latest full server backup for the Friends server. This backup should never be shared with anyone not on the council because it includes all channels. ' +
      presignedUrl,
  )

  return backupId
}
