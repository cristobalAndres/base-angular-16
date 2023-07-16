import { TransactionStatus } from '../enums';

export type TransactionDto = Readonly<{
  transaction_id: string;
  status: TransactionStatus;
  amount?: number;
  saving?: number;
  date?: string;
  cognito_id?: string;
  payment_method?: string;
  store_name?: string;
  reference_id?: string;
  total?: number;
  simple_code?: string;
  confirmation_number?: string;
  buy_order?: string;
  authorization_code?: string;
  card_id?: string;
  commerce_code?: string;
  pos_id?: string;
  user_id?: string;
}>;
