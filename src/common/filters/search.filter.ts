import { FilterQuery } from 'mongoose';

export function createSearchFilter<T>(
  search: string,
  searchFields: Array<keyof T>,
): FilterQuery<T> {
  if (!search) {
    return {};
  }

  const conditions = searchFields.map((field) => ({
    [field]: new RegExp(search, 'i'),
  }));

  return { $or: conditions } as FilterQuery<T>;
}
