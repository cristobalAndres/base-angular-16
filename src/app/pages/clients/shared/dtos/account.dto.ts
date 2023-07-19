export type AccountDto = Readonly<{
  account_external_id: string;
  account_id: string;
  account_label: string;
  account_type: string;
  available_balance: number;
  blocked_balance: number;
  created_at: string;
  currency: string;
  enabled_account: boolean;
  forward_available_balance: number;
  hold_balance: number;
  id: number;
  locked_balance: number;
  payment_method: string;
  total_balance: number;
  updated_at: string;
  user_id: string;
}>;
