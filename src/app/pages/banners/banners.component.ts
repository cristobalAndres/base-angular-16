import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  ActionType,
  PromotionType,
  UpdateBannerRequestDto,
} from '../clients/shared';
import { BannerListResponseDto } from '../clients/shared/dtos/banner-list-response.dto';
import { BannerListDto } from '../clients/shared/dtos/banner-list.dto';
import { CreateBannerDto } from '../clients/shared/dtos/create-banner-request.dto';
import { BannersService } from './data-access/banners-service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  private readonly bannersService = inject(BannersService);
  public bannerList = signal<BannerListDto[]>([]);
  protected allBanners = computed(() => this.getAllBanners());

  ngOnInit() {
    this.getAllBanners();
    // this.createBanner();
    // this.getBannerById();
    // this.deleteBannerById();
    // this.updateBannerById();
    // this.uploadImageBanner();
  }

  getAllBanners() {
    return this.bannersService
      .getAllBanners()
      .subscribe((result: BannerListResponseDto) => {
        // eslint-disable-next-line no-console
        console.log('result: ', result);
        this.bannerList.set(result.data);
      });
  }

  createBanner() {
    const bodyBanner: CreateBannerDto = {
      action_type: ActionType.WEBVIEW,
      active: true,
      country: 'CL',
      from_date: '2023-09-08T13:49:45.890Z',
      to_date: '2023-09-15T13:49:45.890Z',
      id_promotion: '123456789ABC',
      type_promotion: PromotionType.PROMOTION,
      action_type_url: 'https://action-type-url.com',
      title_text: 'Title text',
      image_banner_url: 'https://img-banner-url.com',
      image_tile_url: 'https://img-title-url.com',
      filter_attributes: ['asd'],
      badge_text: 'badget',
      badge_background_color: '#eb4034',
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return this.bannersService
      .createBanner(bodyBanner)
      .subscribe((result: unknown) => {
        // eslint-disable-next-line no-console
        console.log('banner creado: ', result);
      });
  }

  getBannerById() {
    const bannerId = 'e8d5dc45-c050-4ab0-9973-46592f0eee14';
    this.bannersService
      .getBannerById(bannerId)
      .subscribe((result: BannerListDto) => {
        // eslint-disable-next-line no-console
        console.log('getBannerById: ', result);
      });
  }

  deleteBannerById() {
    const bannerId = 'e8d5dc45-c050-4ab0-9973-46592f0eee14';
    this.bannersService
      .deleteBannerById(bannerId)
      .subscribe((result: unknown) => {
        // eslint-disable-next-line no-console
        console.log('deleteBannerById: ', result);
      });
  }

  updateBannerById() {
    const bannerId = '2f0d8e61-8b72-4bbd-8b4b-915c8b614ff1';
    const bodyBanner: UpdateBannerRequestDto = {
      action_type: ActionType.WEBVIEW,
      active: true,
      country: 'CL',
      from_date: '2023-09-08T13:49:45.890Z',
      to_date: '2023-09-15T13:49:45.890Z',
      id_promotion: '123456789ABC',
      type_promotion: PromotionType.PROMOTION,
      action_type_url: 'https://action-type-url.com',
      title_text: 'LOMO LISO 9.990 KG',
      image_banner_url: 'https://img-banner-url.com',
      image_tile_url: 'https://img-title-url.com',
      badge_text: 'badget',
      badge_background_color: '#eb4034',
      filter_attributes: ['comercio_jumbo'],
    };
    this.bannersService
      .updateBannerById(bannerId, bodyBanner)
      .subscribe((result: unknown) => {
        // eslint-disable-next-line no-console
        console.log('updateBannerById: ', result);
      });
  }

  uploadImageBanner(event: Event) {
    // console.log('event: ', event);
    const img = (event.target as HTMLInputElement).files?.item(0);
    // console.log('img:', img);
    const formData: FormData = new FormData();
    if (!img) {
      return;
    }
    formData.append('file', img);
    // console.log('after formData: ', formData.get('file'));
    this.bannersService.uploadBannerImage(formData).subscribe((link) => {
      // eslint-disable-next-line no-console
      console.log('uploadImageBanner: ', link);
    });
  }
}
