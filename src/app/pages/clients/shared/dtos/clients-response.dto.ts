import { ClientDto } from './client.dto';

export type Pagination = Readonly<{
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}>;

export type ClientsResponseDto = Readonly<{
  data: ClientDto[];
  pagination: Pagination;
}>;
