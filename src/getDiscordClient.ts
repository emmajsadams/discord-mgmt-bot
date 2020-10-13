import { Client } from 'discord.js'

import { UserConfig } from './config/users'

export default function getDiscordClient(userConfig: UserConfig): Client {
  // TODO: client options and setup autoreconnect if I too https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
  // NOTE: discord client manages automatically retrying and reconnecting.
  const discordClient = new Client({
    retryLimit: 3,
  })

  discordClient.login(userConfig.token)

  return discordClient
}
