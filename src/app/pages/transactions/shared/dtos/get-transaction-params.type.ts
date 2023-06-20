import { TransactionsFiltersDto } from './transactions-filters.dto';

export type GetTransactionsParams = Readonly<
  Partial<{ perPage: number; currentPage: number } & TransactionsFiltersDto>
>;
