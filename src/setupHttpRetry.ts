import axiosRetry from 'axios-retry'
import axios from 'axios'

export default function setupHttpRetry(): void {
  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })
}
