import { EMMA_BOT } from './config/users'
import getDiscordClient from './getDiscordClient'

// TODO: Note this file is about the general bot.
const EmmaBotClient = getDiscordClient(EMMA_BOT)

export default EmmaBotClient
