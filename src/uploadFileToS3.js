const { S3_BUCKET, S3_API } = require("./ids");

const uploadFileToS3 = async (fileStream, key) => {
  const uploadParams = { Bucket: S3_BUCKET, Key: key, Body: fileStream };

  await S3_API.upload(uploadParams).promise();
};

module.exports = uploadFileToS3;
