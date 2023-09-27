import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateBannerRequestDto } from '@app/pages/clients/shared';
import { BannerListResponseDto } from '@app/pages/clients/shared/dtos/banner-list-response.dto';
import { CreateBannerDto } from '@app/pages/clients/shared/dtos/create-banner-request.dto';
import { GetBannersParams } from '@app/pages/clients/shared/dtos/get-banners-params.dto';
import { createHttpParams } from '@app/shared/utils';
import { BannerDto } from '../../shared/dtos/banner-dto';

@Injectable()
export class BannersService {
  private readonly httpClient = inject(HttpClient);

  getAllBanners(getBannersParams: GetBannersParams) {
    const { currentPage = 1, search = '' } = getBannersParams;
    return this.httpClient.get<BannerListResponseDto>('offers', {
      params: createHttpParams({ currentPage, search }),
    });
  }

  createBanner(body: CreateBannerDto) {
    const cleanBody = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== ''),
    );

    return this.httpClient.post<string>(`/offers`, cleanBody);
  }

  getBannerById(bannerId: string) {
    return this.httpClient.get<BannerDto>(`/offers/${bannerId}`);
  }

  deleteBannerById(bannerId: string) {
    return this.httpClient.delete(`/offers/${bannerId}`);
  }

  updateBannerById(bannerId: string, body: UpdateBannerRequestDto) {
    return this.httpClient.put(`/offers/${bannerId}`, body);
  }

  uploadBannerImage(formData: FormData) {
    return this.httpClient.post<{ image_url: string }>(
      `offers/upload-offer-image`,
      formData,
    );
  }
}