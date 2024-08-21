import { ApiProperty } from '@nestjs/swagger';

export class ListResponse<T> {
  @ApiProperty({ isArray: true, type: Object })
  items: T[];
  @ApiProperty({ type: Number })
  totalCount: number;
}
