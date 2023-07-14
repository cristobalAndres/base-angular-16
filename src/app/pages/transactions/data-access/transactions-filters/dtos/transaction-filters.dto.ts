import { GetTransactionsParamsDto } from '../../transactions-service/dtos';

export type TransactionFiltersDto = Omit<
  GetTransactionsParamsDto,
  'perPage' | 'currentPage'
>;
