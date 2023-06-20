import { TransactionStatus } from '../enums';

export type GetTransactionsParams = Readonly<
  Partial<{
    perPage: number;
    currentPage: number;
    statusFilter: TransactionStatus;
  }>
>;
