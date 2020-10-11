const { S3_BUCKET, S3_API } = require('./ids')

const getSignedS3Url = async (key) => {
  return await S3_API.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60 * 30, // TODO: revisit this expire time based on how I rotate backups
  })
}

module.exports = getSignedS3Url
