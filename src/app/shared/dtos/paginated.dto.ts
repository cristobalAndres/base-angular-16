import { PaginationDto } from './pagination.dto';

export type PaginatedDto<TData> = Readonly<{
  data: readonly TData[];
  pagination: PaginationDto;
}>;
