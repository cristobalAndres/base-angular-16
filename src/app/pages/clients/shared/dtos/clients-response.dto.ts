import { PaginationDto } from '@app/shared/dtos';
import { ClientDto } from './client.dto';

export type ClientsResponseDto = Readonly<{
  data: ClientDto[];
  pagination: PaginationDto;
}>;
