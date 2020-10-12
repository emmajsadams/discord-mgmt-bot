console.log('server started')

export {} // TODO: figure out why this is necessary https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206

// TODO: move to types folder https://stackoverflow.com/questions/42984889/global-types-in-typescript
declare global {
  /**
   * Fix for axios while we wait for ^0.2.1 to be published
   * merge: https://github.com/axios/axios/commit/b7e954eba3911874575ed241ec2ec38ff8af21bb
   * issue: https://github.com/axios/axios/issues/3219
   */
  interface ProgressEvent {} // eslint-disable-line
}

import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

import setupCron from './setupCron'
import setupEventHandlers from './setupEventHandlers'
// import setupEventHandlersForLogging from './setupEventHandlersForLogging'
import setupHttpRetry from './setupHttpRetry'
import setupServer from './setupServer'

setupServer()

// TODO: login and only invoke these functions on ready
setupCron()

// TODO: temporarly disable logging to avoid ratelimits
// setupEventHandlersForLogging()
setupEventHandlers()
setupHttpRetry()
