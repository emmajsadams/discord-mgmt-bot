import fkill from 'fkill'
import setupClients from './setupClients.js'
import setupCron from './setupCron.js'
import setupPrimaryBot from './setupPrimaryBot.js'
import setupServer from './setupServer.js'
import './types/global.js'
;(async () => {
  // TODO: do I need fkill in production? probably just needed in dev only
  try {
    await fkill(':8080', {
      force: true,
      tree: true,
      ignoreCase: true,
    })
  } catch (error) {}

  await setupClients()
  await setupPrimaryBot()
  setupServer()
  setupCron()
})().catch((err) => {
  throw err
})
