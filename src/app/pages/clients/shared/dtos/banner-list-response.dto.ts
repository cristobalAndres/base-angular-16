import { BannerListDto } from './banner-list.dto';
import { Pagination } from './pagination.dto';

export type BannerListResponseDto = Readonly<{
  data: BannerListDto[];
  pagination: Pagination;
}>;
