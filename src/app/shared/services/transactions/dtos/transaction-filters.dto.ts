import {
  TransactionPayMethod,
  TransactionStatus,
  TransactionType,
} from '../enums';

export type TransactionFiltersDto = Readonly<
  Partial<{
    startDate: Date;
    endDate: Date;
    statusFilter: TransactionStatus;
    payMethodFilter: TransactionPayMethod;
    storeName: string;
    posId: number;
    clienteId: string;
    userId: string;
    cardIds: string;
    accountIds: string;
    amount: number;
    transactionType: TransactionType;
  }>
>;
