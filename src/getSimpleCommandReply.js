const { EMMA_USER_ID, EVERYONE } = require("./ids");

// TODO: Upload images used in these commands somewhere else rather than referencing guild specific links
const simpleCommandResponseDict = {
  "hello": {
    [EMMA_USER_ID]: "Hello my beautiful queen!",
    [EVERYONE]: "Begone human filth",
  },
  "open the pod bay door": {
    [EVERYONE]:
      "I'm afraid I can't do that https://www.youtube.com/watch?v=ARJ8cAGm6JE&t=59s",
  },
  "fly": {
    [EVERYONE]:
      "https://cdn.discordapp.com/attachments/761262512485171211/763586083681599498/unknown.png",
  },
  "nofighting": {
    [EVERYONE]:
      "https://www.youtube.com/watch?v=5W75QxHgpoM",
  },
  "synthesis": {
    [EVERYONE]:
      "https://media.discordapp.net/attachments/763827152965337088/764377573366825000/unknown.png",
  },
  "you're a big guy": {
    [EVERYONE]:
      "For you https://media.discordapp.net/attachments/761262512485171211/764380202222354432/latest.png",
  },
};


const getSimpleCommandReply = (authorId, command) => {
  const authorReplyDict = simpleCommandResponseDict[command];
  if (!authorReplyDict) {
    return null;
  }

  const reply = authorReplyDict[authorId];

  return reply ? reply : authorReplyDict[EVERYONE];
};

module.exports = getSimpleCommandReply;