import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class SortQueryDto {
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: 'Sort direction: asc, desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDirection?: string;
}
