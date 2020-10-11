export default function getBotCommand(messageContent) {
  // TODO: figure out why message content is inconsisetnt between desktop and mobile
  // content: '<@!763599207294173234> tell me something random',
  // const emmaMentionedUser = message.mentions.users.get(EMMA_BOT_ID);
  // const atEmmaBotTextInText = message.content.startsWith('@EmmaBot');
  // TODO: figure out how the at mention is represented consistently across mobile, and why exclamation points dont work
  // const EMMA_BOT_ID = '763599207294173234'
  const emmaBotTextInText = messageContent.startsWith('EmmaBot')
  if (!emmaBotTextInText) {
    return null
  }

  return messageContent.substring('EmmaBot '.length).trim()
}
