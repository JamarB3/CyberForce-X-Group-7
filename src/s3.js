import AWS from 'aws-sdk';
import fs from 'fs';

// Configure AWS
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'REMOVED_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'REMOVED_AWS_SECRET_ACCESS_KEY',
});

const s3 = new AWS.S3();

export function uploadFile(bucketName, localFilePath, s3Key) {
  return new Promise((resolve, reject) => {
    fs.readFile(localFilePath, (err, fileData) => {
      if (err) {
        return reject(err);
      }
      const params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: fileData,
        ContentType: 'image/svg+xml',  // Set to the correct MIME type for your file
        ContentDisposition: 'inline',

      };
      s3.upload(params, (err, data) => {
        if (err) return reject(err);
        resolve(data.Location);
      });
    });
  });
}

export function deleteFile(bucketName, s3Key) {
  return new Promise((resolve, reject) => {
    const params = { Bucket: bucketName, Key: s3Key };
    s3.deleteObject(params, (err, data) => {
      if (err) return reject(err);
      resolve('File deleted successfully.');
    });
  });
}

(async () => {
  try {
    const uploadResult = await uploadFile('inclusifind', './assets/logoipsum-332.svg', 'logo.svg');
    console.log('Uploaded file to:', uploadResult);
  } catch (error) {
    console.error(error);
  }
})();

// deleteFile('inclusifind', 'logo.svg')
