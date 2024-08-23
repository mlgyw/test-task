import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResponseFileDto {
  @ApiProperty({ type: String })
  fileUrl: string;
}

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @IsNotEmpty()
  file: any;
}
