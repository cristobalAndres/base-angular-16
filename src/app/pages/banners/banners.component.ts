import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ConfirmModalResponse } from '@app/shared/services/modals/confirm-modal/enums/confirm-moda-respnse.enum';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { catchError, first, tap } from 'rxjs';
import { Pagination } from '../clients/shared';
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
  private readonly confirmModalService = inject(ConfirmModalService);
  private readonly toastService = inject(ToastService);

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

  async deleteBannerById(bannerId: string) {
    const result = await this.confirmModalService.open({
      title: 'Confirmar',
      message: '¿Está seguro que desea eliminar el registro?',
      primaryButtonText: 'Confirmar',
      secondaryButtonText: 'Cancelar',
    });

    if (result === ConfirmModalResponse.SECONDARY_BUTTON_CLICKED) {
      return;
    }

    this.toastService.show({
      body: 'Eliminando registro.',
      color: ToastsColors.PRIMARY,
      delay: 5000,
    });

    this.bannersService
      .deleteBannerById(bannerId)
      .pipe(
        catchError(() => {
          this.toastService.clear();
          this.toastService.show({
            body: 'Error al eliminar registro.',
            color: ToastsColors.DANGER,
            delay: 5000,
          });
          throw Error('Error al eliminar registro.');
        }),
        tap(() => this.toastService.clear()),
        tap(() =>
          this.toastService.show({
            body: 'Registro actualizado correctamente',
            color: ToastsColors.SUCCESS,
            delay: 2000,
          }),
        ),
        tap(() => this.getAllBanners()),
      )
      .subscribe();
  }
}
