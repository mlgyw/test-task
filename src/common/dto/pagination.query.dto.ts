import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}
