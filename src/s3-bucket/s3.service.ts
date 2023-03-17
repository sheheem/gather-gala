import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const region = 'ap-south-1';
const bucketName = 'image-upload-s3bucket';

const s3 = new S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID,
  region,
  signatureVersion: 'v4',
});

@Injectable()
export class S3Service {
  async generateUploadUrl() {
    const rawBytes = randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 600,
    };

    return await s3.getSignedUrlPromise('putObject', params);
  }
}
