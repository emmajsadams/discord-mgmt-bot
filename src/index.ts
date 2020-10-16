// TODO: avoid singletons in discordClient so that I do not have to call this immediately
import setupEnvironment from './setupEnvironment'
setupEnvironment()

import './types/global'
import setupCron from './setupCron'
import setupPrimaryBot from './setupPrimaryBot'
import setupServer from './setupServer'
;(async () => {
  await setupPrimaryBot()
  setupServer()
  setupCron()
})().catch((err) => {
  throw err
})
