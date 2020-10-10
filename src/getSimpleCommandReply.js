const { EMMA_USER_ID, EVERYONE } = require('./ids');

const simpleCommandResponseDict = {
  'hello': {
    [EMMA_USER_ID]: 'Hello my beautiful queen!',
    [EVERYONE]: 'Begone human filth'
  },
  'open the pod bay door': {
    [EVERYONE]: "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s"
  }
}

const getSimpleCommandReply = (authorId, command) => {
  const authorReplyDict = simpleCommandResponseDict[command];
  if (!authorReplyDict) {
    return null;
  }

  const reply = authorReplyDict[authorId];

  return reply ? reply : authorReplyDict[EVERYONE];
}

module.exports = getSimpleCommandReply
