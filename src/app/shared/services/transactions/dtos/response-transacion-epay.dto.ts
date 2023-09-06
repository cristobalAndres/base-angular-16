import { ResponseParamsTransactionEpayDto } from './response-params-transaction-epay.dto';

export type ResponseTransactionEpayDto = Readonly<{
  transaction_id: string;
  fk_card_id: number;
  commerce_order_id: string;
  updated_at: string;
  added_at: string;
  status: string;
  capture_auth_code: string;
  auth_code: string;
  capture_value: number;
  balance: number;
  transfer_ok_at: string;
  refundable_balance: number;
  link_id: string | null;
  params: ResponseParamsTransactionEpayDto;
}>;
