import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileRepository } from '@/file/file.repository';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path'; // Для работы с путями и расширениями
import { MAX_FILE_SIZE, FILE_ERROR_MAX_SIZE_ERROR, FILE_CANNOT_CREATE_ERROR, NO_FILE_ERROR, CANNOT_CREATE_BUCKET_ERROR } from '@/file/file.constants';
import { ResponseFileDto } from '@/file/dto/file.dto';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository, private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File): Promise<ResponseFileDto> {
    if (!file) {
      throw new BadRequestException(NO_FILE_ERROR);
    }

    try {
        await this.fileRepository.createBucket();
    } catch (error) {
        throw new InternalServerErrorException(CANNOT_CREATE_BUCKET_ERROR);
    }

    const uniqueId = uuidv4();
 
    const extname = path.extname(file.originalname);
    
    const objectName = `${uniqueId}${extname}`;
	const contentType = file.mimetype || 'application/octet-stream';
	
	if (file.size > MAX_FILE_SIZE) {
        throw new BadRequestException(FILE_ERROR_MAX_SIZE_ERROR);
    }

     try {
        await this.fileRepository.uploadFile(objectName, file.buffer, file.size, contentType);
    } catch (error) {
        throw new InternalServerErrorException(FILE_CANNOT_CREATE_ERROR);
    }

    const fileUrl = this.getFileUrl(objectName);

    return {
      fileUrl: fileUrl
    };
  }

  getFileUrl(objectName: string): string {
    const protocol = this.configService.get<string>('MINIO_USE_SSL') === 'true' ? 'https' : 'http';
    const endpoint = this.configService.get<string>('MINIO_ENDPOINT');
    const port = this.configService.get<number>('MINIO_PORT');
	const bucketName = this.fileRepository.bucketName
    
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  }
}
