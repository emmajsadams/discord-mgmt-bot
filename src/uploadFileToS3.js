const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-west-2'});

const uploadFileToS3 = async (fileStream, key) => {
  const uploadParams = {Bucket: 'emmabot', Key: key, Body: fileStream};

  await s3.upload(uploadParams).promise()
}

module.exports = uploadFileToS3
