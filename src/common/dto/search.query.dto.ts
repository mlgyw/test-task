import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QuerySearchDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  search?: string;
}
