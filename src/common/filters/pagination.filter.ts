import { PaginationParams } from '@/common/interfaces/pagination.interface';

export function createPaginationParams(
  page: number = 1,
  limit: number = 10,
): PaginationParams {
  const skip = (page - 1) * limit;
  return { skip, limit };
}
