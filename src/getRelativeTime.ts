import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en' // TODO: do somethign about this

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function getRelativeTime(date: Date): string {
  // Subtract 10 seconds to correct
  return timeAgo.format(date.getTime() - 10 * 1000)
}
