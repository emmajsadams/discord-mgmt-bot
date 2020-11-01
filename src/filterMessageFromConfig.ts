import { Message } from 'discord.js'
import MESSAGE_FILTERS from './config/messageFilters'

// TODO: move delete and reply in to filterMessage.
// TODO: pass message object to filterMessage
export default function filterMessage(message: Message): string {
  for (const filterName of Object.keys(MESSAGE_FILTERS)) {
    const filter = MESSAGE_FILTERS[filterName]
    if (filter.regex.test(message.content)) {
      return filter.message
    }
  }

  return ''
}
