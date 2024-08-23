// minio.repository.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { FILE_CONTENT_DISPOSITION } from '@/file/file.constants';
import { parseBoolean } from '@/common/utils/parse.bool';

@Injectable()
export class FileRepository {
  private readonly minioClient: Minio.Client;
  bucketName: string;

  constructor(private readonly configService: ConfigService) {
	this.bucketName = configService.get<string>('MINIO_BUCKET_NAME');

    this.minioClient = new Minio.Client({
      endPoint: configService.get<string>('MINIO_ENDPOINT'),
      port: Number(this.configService.get<string>('MINIO_PORT')),
      useSSL: parseBoolean(configService.get<string>('MINIO_USE_SSL')), 
      accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  async uploadFile(
    objectName: string,
    fileBuffer: Buffer,
    fileSize: number,
    contentType: string,
  ): Promise<void> {
    const metaData = {
      'Content-Type': contentType,
      'Content-Disposition': FILE_CONTENT_DISPOSITION,
    };

    try {
      await this.minioClient.putObject(
        this.bucketName,
        objectName,
        fileBuffer,
        fileSize,
        metaData,
      );
    } catch (error) {
      throw error;
    }
  }

  async createBucket(): Promise<boolean> {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);

      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName);
        return true;
      }

      return true;
    } catch (err) {
      throw err;
    }
  }
}
