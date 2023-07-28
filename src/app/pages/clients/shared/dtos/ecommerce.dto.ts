export type EcommerceDto = Readonly<{
  id: string;
  callback_u_r_l?: string;
  channel?: string;
  email?: string;
  id_ecommerce?: string;
  link_id?: string;
  payment_method_enabled?: boolean;
  qr_id?: string;
  rut?: string;
  timestamp?: string;
  user_id?: string;
}>;
