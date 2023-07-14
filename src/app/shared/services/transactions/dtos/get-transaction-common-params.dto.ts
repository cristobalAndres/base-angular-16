import { TransactionFiltersDto } from './transaction-filters.dto';

export type GetTransactionsCommonParamsDto = Readonly<
  TransactionFiltersDto & Partial<{ perPage: number; currentPage: number }>
>;
