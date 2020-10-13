import axios from 'axios'

// TODO: add basic authentication to my gpt2 api
const GPT2_API_URL = 'http://34.105.75.35/generate'

export default async function getGPTReply(command) {
  // TODO: add a retry
  const response = await axios.get(GPT2_API_URL, {
    params: {
      length: 200,
      prefix: command,
    },
  })

  return response.status !== 200
    ? null
    : response.data.text.split('<|endoftext|>')[0]
}
