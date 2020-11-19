import cron from 'node-cron'
import backup from './backup.js'
import isDisabled from './environment/isDisabled.js'

export default function setupCron() {
	cron.schedule('0 0 * * *', async () => {
		if (isDisabled('backup')) {
			return
		}

		await backup()
	})
}
