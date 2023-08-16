import { UserStatusType } from '../enums';

export type UserDynamo = Readonly<{
  kyc_valid?: boolean;
  wallet_active?: boolean;
}>;

export type ClientDto = Readonly<{
  id: string;
  email: string;
  status: UserStatusType;
  blocked: boolean;
  phone_number: string;
  created_at: string;
  rut: string;
  name: string;
  last_name: string;
  dynamo: UserDynamo;
}>;
