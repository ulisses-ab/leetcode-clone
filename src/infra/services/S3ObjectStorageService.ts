import { IObjectStorageService } from "../../application/services/IObjectStorageService";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
dotenv.config();

export type S3Config = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

export class S3ObjectStorageService implements IObjectStorageService {
  private s3: S3Client;
  private bucket: string;

  constructor(config: S3Config) {
    this.bucket = config.bucketName;
    this.s3 = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId!,
        secretAccessKey: config.secretAccessKey!,
      },
    });
  }

  async upload(key: string, data: Buffer): Promise<void> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: data,
      })
    );
  }

  async download(key: string): Promise<Buffer> {
    const result = await this.s3.send(
      new GetObjectCommand({ 
        Bucket: this.bucket,
        Key: key
      })
    );

    const array = await result.Body?.transformToByteArray();
    if (!array) throw new Error("Failed to download object");
    return Buffer.from(array);
  }

  async delete(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
  }
}
