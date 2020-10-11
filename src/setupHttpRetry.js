const axiosRetry = require('axios-retry')
const axios = require('axios')

const setupHttpRetry = () => {
  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })
}

module.exports = setupHttpRetry
