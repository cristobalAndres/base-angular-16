import { GetTransactionsCommonParamsDto } from '@app/shared/services/transactions';

export type GetTransactionsParamsDto = Pick<
  GetTransactionsCommonParamsDto,
  | 'endDate'
  | 'startDate'
  | 'statusFilter'
  | 'payMethodFilter'
  | 'storeName'
  | 'posId'
  | 'clienteId'
  | 'userId'
  | 'perPage'
  | 'currentPage'
>;
