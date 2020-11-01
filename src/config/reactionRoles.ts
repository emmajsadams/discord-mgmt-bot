import { Snowflake } from 'discord.js'

interface ReactionRoles {
  // channelId: Snowflake
  [channelId: string]: {
    // messageId: Snowflake
    [messageId: string]: {
      // emojiId: Snowflake -> roleId: Snowflake
      [emojiId: string]: Snowflake
    }
  }
}

// TODO: add reactions from bot
const reactionRoles: ReactionRoles = {
  // #pronouns
  '770117821412671499': {
    // pronouns post
    '770118341083791412': {
      // she/her
      '❤️': '770117867609522206',
      // he/him
      '💙': '770117896381661205',
      // they/them
      '💛': '770117933804158995',
    },
  },
}

export default reactionRoles
