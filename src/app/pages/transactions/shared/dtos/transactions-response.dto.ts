import { TransactionDto } from './transaction.dto';

// TODO: Change snake case to camel case
export type TransactionsResponseDto = Readonly<{
  transactions: ReadonlyArray<TransactionDto>;
  current_page: number;
  total_pages: number;
  total_items: number;
}>;
