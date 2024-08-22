import { QueryDto } from '@/common/dto/query.dto';
import { SortParams } from '@/common/interfaces/sort.interface';

export function createSortParams<T>(field: keyof T, queryDto : QueryDto): SortParams{
	const sortDirection: 1 | -1  = queryDto.sortDirection === 'asc' ? 1 : -1;

  return {
    [field] : sortDirection
  };
}
