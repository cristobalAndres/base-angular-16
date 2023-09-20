import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateBannerRequestDto } from '@app/pages/clients/shared';
import { BannerListResponseDto } from '@app/pages/clients/shared/dtos/banner-list-response.dto';
import { BannerListDto } from '@app/pages/clients/shared/dtos/banner-list.dto';
import { CreateBannerDto } from '@app/pages/clients/shared/dtos/create-banner-request.dto';

@Injectable()
export class BannersService {
  private readonly httpClient = inject(HttpClient);

  getAllBanners() {
    return this.httpClient.get<BannerListResponseDto>('offers');
  }

  createBanner(body: CreateBannerDto) {
    return this.httpClient.post<string>(`/offers`, body);
  }

  getBannerById(bannerId: string) {
    return this.httpClient.get<BannerListDto>(`/offers/${bannerId}`);
  }

  deleteBannerById(bannerId: string) {
    return this.httpClient.delete(`/offers/${bannerId}`);
  }

  updateBannerById(bannerId: string, body: UpdateBannerRequestDto) {
    return this.httpClient.put(`/offers/${bannerId}`, body);
  }

  uploadBannerImage(formData: FormData) {
    return this.httpClient.post(`offers/upload-offer-image`, formData);
  }
}
