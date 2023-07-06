import { ClientParameter } from '../enums';

export interface GetClientsParams {
  currentPage?: number;
  search?: string;
  searchParam?: ClientParameter;
  perPage?: number;
}
