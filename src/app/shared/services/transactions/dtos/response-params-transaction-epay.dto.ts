export type ResponseParamsTransactionEpayDto = Readonly<{
  payment_method: string;
  acquirer: string;
  card_token_id: string;
  response_code: number;
  response_message: string;
  status: string;
  message: string;
}>;
