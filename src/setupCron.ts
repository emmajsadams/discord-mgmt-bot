const cron = require('node-cron')
const backup = require('./backup')

export default function setupCron() {
  cron.schedule('0 0 * * *', async () => {
    await backup()
  })
}
