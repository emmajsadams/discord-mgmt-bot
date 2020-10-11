export {} // TODO: figure out why this is necessary https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206

require('dotenv').config()

const setupCron = require('./setupCron')
const setupHttpRetry = require('./setupHttpRetry')
const setupEventHandlers = require('./setupEventHandlers')
const setupServer = require('./setupServer')

setupHttpRetry()
setupCron()
setupEventHandlers()
setupServer()
