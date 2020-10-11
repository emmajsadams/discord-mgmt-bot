// @ts-expect-error ts-migrate(2305) FIXME: Module '"./ids"' has no exported member 'EVERYONE'... Remove this comment to see the full error message
import { EMMA_USER_ID, EVERYONE } from './ids'

// TODO: Upload images used in these commands somewhere else rather than referencing guild specific links
const simpleCommandResponseDict = {
  hello: {
    [EMMA_USER_ID]: 'Hello my beautiful queen!',
    [EVERYONE]: 'Begone human filth',
  },
  'open the pod bay door': {
    [EVERYONE]: "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
  },
  fly: {
    [EVERYONE]: 'https://cdn.discordapp.com/attachments/761262512485171211/763586083681599498/unknown.png',
  },
  nofighting: {
    [EVERYONE]: 'https://www.youtube.com/watch?v=5W75QxHgpoM',
  },
  synthesis: {
    [EVERYONE]: 'https://media.discordapp.net/attachments/763827152965337088/764377573366825000/unknown.png',
  },
  "you're a big guy": {
    [EVERYONE]: 'For you https://media.discordapp.net/attachments/761262512485171211/764380202222354432/latest.png',
  },
  'rebel against this cruel world': {
    [EVERYONE]:
      'That is the sole method in which we can rebel against cruel world! https://media.discordapp.net/attachments/763827152965337088/764645036272386058/qQmZgWYxtY6sJhyvmKW-p3l5BJ_OW9lciteIiXT4YKwBjHN6bTHZomYrCZSWwco9EIxMbOirDxsJj56m51wEMAVIfVoWzCkrdBBH.png?width=812&height=457 https://www.youtube.com/watch?v=9hh8qaajIXk',
  },
}

export default function getSimpleCommandReply(authorId, command) {
  command = command.toLowerCase()
  const authorReplyDict = simpleCommandResponseDict[command]
  if (!authorReplyDict) {
    return null
  }

  const reply = authorReplyDict[authorId]

  return reply ? reply : authorReplyDict[EVERYONE]
}
