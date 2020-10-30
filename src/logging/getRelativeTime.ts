import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en/index.js'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

// TODO: consider formatRelativeName instead?
export default function getRelativeTime(date: Date): string {
  // Subtract 10 seconds to correct for Discord timestamp precision for accounts that were just created and joined
  // otherwise it would show these accounts being created in the future
  return timeAgo.format(date.getTime() - 10 * 1000)
}
