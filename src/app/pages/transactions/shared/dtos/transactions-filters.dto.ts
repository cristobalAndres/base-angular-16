import { TransactionStatus } from '../enums';

export type TransactionsFiltersDto = Readonly<
  Partial<{
    startDate: Date;
    endDate: Date;
    statusFilter: TransactionStatus;
  }>
>;
