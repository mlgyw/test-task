import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common/dto/pagination.query';
import { QuerySearchDto } from '@/common/dto/search.query';
import { QueryDateFilterDto } from '@/common/dto/date.query';
import { QueryTagsFilterDto } from '@/common/dto/tags.query';

export class QueryDto extends IntersectionType(
  PaginationQueryDto,
  QuerySearchDto,
  QueryDateFilterDto,
  QueryTagsFilterDto,
) {}
