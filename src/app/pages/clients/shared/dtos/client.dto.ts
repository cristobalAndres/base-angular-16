import { UserStatusType } from '../enums';

export type UserDynamo = Readonly<{
  kyc_valid: {
    b_o_o_l: boolean;
  };
  last_name: {
    s: string;
  };
  created_at: {
    s: string;
  };
  email: {
    s: string;
  };
  country: {
    s: string;
  };
  name: {
    s: string;
  };
  client_id: {
    s: string;
  };
  kyc_info: {
    s: string;
  };
  id_cognito: {
    s: string;
  };
  kyc_provider: {
    s: string;
  };
  wallet_active: {
    b_o_o_l: boolean;
  };
  second_surname: {
    s: string;
  };
  id: {
    s: string;
  };
}>;

export type ClientDto = Readonly<{
  id?: string;
  email?: string;
  status?: UserStatusType;
  username?: string;
  blocked?: boolean;
  phone_number?: string;
  created_at?: Date;
  rut?: string;
  name?: string;
  lastName?: string;
  dynamo?: UserDynamo;
}>;
