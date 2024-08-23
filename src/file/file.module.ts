import { Module } from '@nestjs/common';
import { FileController } from '@/file/file.conroller';
import { FileService } from '@/file/file.service';
import { FileRepository } from '@/file/file.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}

