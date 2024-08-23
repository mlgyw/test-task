import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@/file/file.service';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseFileDto, UploadFileDto } from '@/file/dto/file.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Note successfully created',
    type: ResponseFileDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }
}
