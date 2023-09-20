export type Pagination = Readonly<{
  per_page: number;
  total_items: number;
  total_pages: number;
  current_page: number;
}>;
