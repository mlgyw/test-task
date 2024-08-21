import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';

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

export class QuerySearchDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  search?: string;
}

export class QueryDto extends IntersectionType(PaginationQueryDto, QuerySearchDto){
}
