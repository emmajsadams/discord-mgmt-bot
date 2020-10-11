import { S3_BUCKET, S3_API } from './ids'

export default async function getSignedS3Url(key) {
  return await S3_API.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60 * 30, // TODO: revisit this expire time based on how I rotate backups
  })
}
