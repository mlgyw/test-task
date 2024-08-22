import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import { QuerySearchDto } from '@/common/dto/search.query.dto';
import { QueryDateFilterDto } from '@/common/dto/date.query.dto';
import { QueryTagsFilterDto } from '@/common/dto/tags.query.dto';
import { SortQueryDto } from '@/common/dto/sort.query.dto';

export class QueryDto extends IntersectionType(
  PaginationQueryDto,
  QuerySearchDto,
  QueryDateFilterDto,
  QueryTagsFilterDto,
  SortQueryDto
) {}
