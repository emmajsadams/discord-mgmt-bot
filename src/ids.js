const AWS = require("aws-sdk");

// TODO: Change this file to constants.js
module.exports = {
  EMMA_USER_ID: "325088597286060044",
  EVERYONE_USER_ID: "everyone",
  FRIENDS_GUILD_ID: "761254466979889153",
  ACQUAINTANCE_ROLE: "761255602138775572",
  EMMA_PRAY_EMOJI: ":emmapray:761721006704164874",
  S3_BUCKET: "emmabot",
  S3_API: new AWS.S3({ apiVersion: "2006-03-01", region: "us-west-2" }), // TODO: consider if this should be in a separate file with s3_Bucket for constants
};
