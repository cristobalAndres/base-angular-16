import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first, tap } from 'rxjs';
import {
  ActionType,
  Pagination,
  PromotionType,
  UpdateBannerRequestDto,
} from '../clients/shared';
import { BannerListResponseDto } from '../clients/shared/dtos/banner-list-response.dto';
import { BannerListDto } from '../clients/shared/dtos/banner-list.dto';
import { BannerFiltersDto } from '../clients/shared/dtos/banners-filter.dto';
import { BannersService } from './data-access/banners-service';
import { CreateBannerComponent } from './features/create-banner/create-banner.component';
import { BannerDto } from './shared/dtos/banner-dto';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  private readonly bannersService = inject(BannersService);
  private readonly modalService = inject(NgbModal);

  modalReference: NgbModalRef | undefined;

  public bannerList = signal<BannerListDto[]>([]);
  protected isLoading = signal<boolean>(false);
  public paginationBannerList = signal<Pagination>({
    per_page: 10,
    total_items: 0,
    total_pages: 0,
    current_page: 0,
  });
  protected allBanners = computed(() => this.getAllBanners());
  private currentPageSig = signal(1);
  private search = signal<BannerFiltersDto>({ search: '' });
  protected hasError = signal<boolean>(false);

  ngOnInit() {
    this.getAllBanners();
    // this.createBanner();
    // this.getBannerById();
    // this.deleteBannerById();
    // this.updateBannerById();
    // this.uploadImageBanner();
  }

  getAllBanners() {
    this.isLoading.set(true);
    this.bannersService
      .getAllBanners({
        currentPage: this.currentPageSig(),
        search: this.search().search,
        perPage: 10,
      })
      .subscribe({
        next: (result: BannerListResponseDto) => {
          this.bannerList.set(result.data);
          this.paginationBannerList.set(result.pagination);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.hasError.set(true);
        },
      });
  }

  protected retryButtonClick() {
    this.hasError.set(false);
    this.getAllBanners();
  }

  onSearchButtonClick(bannersFilters: BannerFiltersDto) {
    this.search.set(bannersFilters);
    this.getAllBanners();
  }

  onBannerCurrentPageChange(currentPage: number) {
    this.currentPageSig.set(currentPage);
    this.getAllBanners();
  }

  createBanner() {
    this.modalReference = this.modalService.open(CreateBannerComponent, {
      size: 'xl',
      centered: true,
    });
  }

  getBannerById(bannerId: string) {
    this.bannersService
      .getBannerById(bannerId)
      .pipe(
        first(),
        tap((result: BannerDto) => this.openModalToEdit(result)),
      )
      .subscribe();
  }

  openModalToEdit(promotion: BannerDto) {
    const modalRef = this.modalService.open(CreateBannerComponent, {
      size: 'xl',
      centered: true,
    });

    if (modalRef.componentInstance instanceof CreateBannerComponent) {
      modalRef.componentInstance.promotionToEdit = promotion;
    }
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
