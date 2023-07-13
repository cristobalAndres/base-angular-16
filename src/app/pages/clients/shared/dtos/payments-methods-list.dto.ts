import { PaymentsMethodsType } from '../enums';

export type PaymentsMethodsListDto = Readonly<{
  id: string;
  mask?: string;
  brand?: string;
  card_type?: string;
  is_active?: boolean;
  is_inherited?: boolean;
  added_at?: string;
  is_selected?: boolean;
  deleted_at?: string;
  payment_method_type: PaymentsMethodsType;
}>;
