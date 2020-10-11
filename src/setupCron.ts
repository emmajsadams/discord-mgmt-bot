import { schedule } from 'node-cron'
import backup from './backup'

export default function setupCron() {
  schedule('0 0 * * *', async () => {
    await backup()
  })
}
