import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

export default s3;
