import { EcommerceDto } from './ecommerce.dto';

export type EcommerceResponseDto = Readonly<{
  ecommerces: EcommerceDto[];
  current_page: number;
  total_pages: number;
  total_items: number;
}>;
