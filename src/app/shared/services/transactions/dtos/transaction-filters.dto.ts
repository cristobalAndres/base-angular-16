import { TransactionStatus, TransactionType } from '../enums';

export type TransactionFiltersDto = Readonly<
  Partial<{
    startDate: Date;
    endDate: Date;
    statusFilter: TransactionStatus;
    userId: string;
    cardIds: string;
    accountIds: string;
    amount: number;
    transactionType: TransactionType;
  }>
>;
