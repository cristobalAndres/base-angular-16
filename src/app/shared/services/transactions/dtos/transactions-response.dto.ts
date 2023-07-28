import { TransactionDto } from './transaction.dto';

export type TransactionsResponseDto = Readonly<{
  transactions: ReadonlyArray<TransactionDto>;
  current_page: number;
  total_pages: number;
  total_items: number;
}>;
