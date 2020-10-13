import { S3_BUCKET, S3_API } from './ids'

export default async function getSignedS3Url(key): Promise<string> {
  // TODO: consider making link expire? files will be deleted so it doesn't matter
  return S3_API.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: key,
    // Expires: 60 * 30, // TODO: revisit this expire time based on how I rotate backups
  })
}
