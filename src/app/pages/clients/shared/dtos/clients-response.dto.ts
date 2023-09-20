import { ClientDto } from './client.dto';
import { Pagination } from './pagination.dto';

export type ClientsResponseDto = Readonly<{
  data: ClientDto[];
  pagination: Pagination;
}>;
