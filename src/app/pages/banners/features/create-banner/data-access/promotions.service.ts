import { Injectable, inject } from '@angular/core';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import { RefreshService } from '@app/pages/banners/data-access/refresh-service/refresh.service';
import {
  CreateBannerDto,
  UpdateBannerRequestDto,
} from '@app/pages/clients/shared';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, first, pipe, tap } from 'rxjs';
import {
  PromotionFormDto,
  PromotionFormSettingsDto,
} from '../dtos/promotion-form.dto';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private readonly bannerService = inject(BannersService);
  private readonly toastService = inject(ToastService);
  private readonly modalService = inject(NgbModal);
  private readonly confirmModalService = inject(ConfirmModalService);
  private readonly refreshService = inject(RefreshService);

  saveForm(data: {
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
  }) {
    const { form, settings } = data;

    const formValue = { ...form };

    delete formValue.commerces;

    const body = { ...formValue };

    return this.bannerService.createBanner(body as CreateBannerDto).pipe(
      catchError(() => {
        this.toastService.clear();
        this.toastService.show({
          body: settings.toast.errorMessage,
          color: ToastsColors.DANGER,
          delay: 5000,
        });
        throw Error(settings.toast.errorMessage);
      }),
      tap(() => this.toastService.clear()),
      tap(() =>
        this.toastService.show({
          body: settings.toast.successMessage,
          color: ToastsColors.SUCCESS,
          delay: 2000,
        }),
      ),
      tap(() => this.refreshService.refresh.next(true)),
      tap(() => this.modalService.dismissAll()),
      first(),
    );
  }

  updateForm(data: {
    id: string;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
  }) {
    const dataToUpdate = { ...data, image_url: undefined };
    return this.updateBanner(dataToUpdate).pipe(
      this.genericPipeToUpdate(data.settings),
    );
  }

  private updateBanner(data: {
    id: string;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
  }) {
    const { id, form } = data;

    const formValue = { ...form };

    delete formValue.commerces;

    const body = { ...formValue };

    return this.bannerService.updateBannerById(
      id,
      body as UpdateBannerRequestDto,
    );
  }

  private genericPipeToUpdate(settings: PromotionFormSettingsDto) {
    return pipe(
      catchError(() => {
        this.toastService.clear();
        this.toastService.show({
          body: settings.toast.errorMessage,
          color: ToastsColors.DANGER,
          delay: 5000,
        });
        throw Error(settings.toast.errorMessage);
      }),
      tap(() => this.toastService.clear()),
      tap(() =>
        this.toastService.show({
          body: settings.toast.successMessage,
          color: ToastsColors.SUCCESS,
          delay: 2000,
        }),
      ),
      tap(() => this.modalService.dismissAll({ refresh: true })),
      tap(() => this.refreshService.refresh.next(true)),
      first(),
    );
  }
}
