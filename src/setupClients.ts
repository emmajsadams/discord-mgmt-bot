import { BOTS } from './config/bots.js'
import getDiscordClient from './getClient.js'

export default async function setupDiscordClient() {
  // TODO: move this to separate function
  // Login and setup all clients immediately
  for (const botConfig of BOTS) {
    await getDiscordClient(botConfig)
  }
}
