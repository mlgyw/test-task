import { FilterQuery } from 'mongoose';

export function createDateFilter<T>(
  startDate?: Date,
  endDate?: Date,
): FilterQuery<T> {
  if (startDate && endDate) {
    return {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }
  return {};
}
