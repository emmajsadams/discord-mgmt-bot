const AWS = require("aws-sdk");

module.exports = {
  EMMA_USER_ID: "325088597286060044",
  EVERYONE_USER_ID: "everyone",
  FRIENDS_GUILD_ID: "761254466979889153",
  ACQUAINTANCE_ROLE: "761255602138775572",
  EMMA_PRAY_EMOJI: ":emmapray:761721006704164874",
  PRONOUN_MESSAGE_ID: "762153528851431445",
  COOMER_MESSAGE_ID: "762104139739430912",
  TABLETOP_MESSAGE_ID: "762509321694740490",
  MINECRAFT_MESSAGE_ID: "762939489773289483",
  MENS_LIBERATION_MESSAGE_ID: "764739325518413835",

  // TODO: create a separate constants file for S3
  S3_BUCKET: "emmabot",
  S3_API: new AWS.S3({ apiVersion: "2006-03-01", region: "us-west-2" }),
};
