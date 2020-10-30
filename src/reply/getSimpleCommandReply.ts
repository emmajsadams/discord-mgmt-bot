import { BOT_OWNER_USER_ID, EVERYONE_USER_ID } from '../config/users.js'

// TODO: Upload images used in these commands somewhere else rather than referencing guild specific links
const simpleCommandResponseDict = {
  'hello': {
    [BOT_OWNER_USER_ID]: 'Hello my beautiful queen!',
    [EVERYONE_USER_ID]: 'Begone human filth',
  },
  'open the pod bay door': {
    [EVERYONE_USER_ID]:
      "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
  },
  'nofighting': {
    [EVERYONE_USER_ID]: 'https://www.youtube.com/watch?v=5W75QxHgpoM',
  },
  'rebel against this cruel world': {
    [EVERYONE_USER_ID]:
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

  return reply ? reply : authorReplyDict[EVERYONE_USER_ID]
}
