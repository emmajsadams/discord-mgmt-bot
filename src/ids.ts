import { S3 } from 'aws-sdk'

export const EMMA_USER_ID = '325088597286060044'
export const EVERYONE_USER_ID = 'everyone'
export const FRIENDS_GUILD_ID = '761254466979889153'
export const ACQUAINTANCE_ROLE = '761255602138775572'
export const EMMA_PRAY_EMOJI = ':emmapray:761721006704164874'
export const PRONOUN_MESSAGE_ID = '762153528851431445'
export const COOMER_MESSAGE_ID = '762104139739430912'
export const TABLETOP_MESSAGE_ID = '762509321694740490'
export const MINECRAFT_MESSAGE_ID = '762939489773289483'
export const MENS_LIBERATION_MESSAGE_ID = '764739325518413835'

// TODO: create a separate constants file for S3
export const S3_BUCKET = 'emmabot'
export const S3_API = new S3({ apiVersion: '2006-03-01', region: 'us-west-2' })
