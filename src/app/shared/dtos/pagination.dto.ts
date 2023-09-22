export type PaginationDto = Readonly<{
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}>;
