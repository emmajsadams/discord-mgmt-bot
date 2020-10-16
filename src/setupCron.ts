import { schedule } from 'node-cron'
import backup from './backup'
import isDisabled from './isDisabled'

export default function setupCron() {
  schedule('0 0 * * *', async () => {
    if (isDisabled('backup')) {
      return
    }

    await backup()
  })
}
