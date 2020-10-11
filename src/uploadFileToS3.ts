import { S3_BUCKET, S3_API } from './ids'

export default async function uploadFileToS3(fileStream, key) {
  const uploadParams = { Bucket: S3_BUCKET, Key: key, Body: fileStream }

  await S3_API.upload(uploadParams).promise()
}
