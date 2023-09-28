import { Injectable, inject } from '@angular/core';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import {
  CreateBannerDto,
  PromotionType,
  UpdateBannerRequestDto,
} from '@app/pages/clients/shared';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ConfirmModalResponse } from '@app/shared/services/modals/confirm-modal/enums/confirm-moda-respnse.enum';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { catchError, first, mergeMap, pipe, tap } from 'rxjs';
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

  async saveForm(data: {
    image: File;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
    typePromotion: PromotionType;
  }) {
    const { image, form, settings, typePromotion } = data;

    const result = await this.confirmModalService.open({
      title: settings.modal.title,
      message: settings.modal.message,
      primaryButtonText: settings.modal.primaryButtonText,
      secondaryButtonText: settings.modal.secondaryButtonText,
    });

    if (result !== ConfirmModalResponse.PRIMARY_BUTTON_CLICKED) {
      return;
    }

    this.toastService.show({
      body: 'Cargando...',
      color: ToastsColors.PRIMARY,
      delay: 20000,
    });

    const formData = new FormData();
    formData.append('file', image);

    return this.bannerService.uploadBannerImage(formData).pipe(
      mergeMap(({ image_url }) => {
        const commerces = form.commerces ?? [];
        const formValue = { ...form };

        delete formValue.commerces;

        let body = {};

        if (typePromotion === PromotionType.BANNER) {
          body = this.getBodyByBanner(formValue, commerces, image_url);
        }

        if (typePromotion === PromotionType.PROMOTION) {
          body = this.getBodyByPromotion(formValue, commerces, image_url);
        }

        if (typePromotion === PromotionType.BANNER_AND_PROMOTION) {
          body = this.getBodyByBannderAndPromotion(
            formValue,
            commerces,
            image_url,
          );
        }

        return this.bannerService.createBanner(body as CreateBannerDto);
      }),
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
      tap(() => this.modalService.dismissAll()),
      first(),
    );
  }

  private getBodyByBanner(
    formValue: CreateBannerDto,
    commerces: ListItem[],
    imagenUrl?: string,
  ) {
    return {
      ...formValue,
      image_banner_url: imagenUrl ?? formValue?.image_banner_url,
      filter_attributes: commerces?.map((i) => i.id.toString()),
    };
  }

  private getBodyByPromotion(
    formValue: CreateBannerDto,
    commerces: ListItem[],
    imagenUrl?: string,
  ) {
    return {
      ...formValue,
      image_tile_url: imagenUrl ?? formValue?.image_tile_url,
      filter_attributes: commerces?.map((i) => i.id.toString()),
    };
  }

  private getBodyByBannderAndPromotion(
    formValue: CreateBannerDto,
    commerces: ListItem[],
    imagenUrl?: string,
  ) {
    return {
      ...formValue,
      image_banner_url: imagenUrl ?? formValue?.image_banner_url,
      image_tile_url: imagenUrl ?? formValue?.image_tile_url,
      filter_attributes: commerces?.map((i) => i.id.toString()),
    };
  }

  async updateForm(data: {
    id: string;
    image?: File;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
    typePromotion: PromotionType;
  }) {
    const { image, settings } = data;

    const result = await this.confirmModalService.open({
      title: settings.modal.title,
      message: settings.modal.message,
      primaryButtonText: settings.modal.primaryButtonText,
      secondaryButtonText: settings.modal.secondaryButtonText,
    });

    if (result !== ConfirmModalResponse.PRIMARY_BUTTON_CLICKED) {
      return;
    }
    this.toastService.show({
      body: 'Cargando...',
      color: ToastsColors.PRIMARY,
      delay: 20000,
    });

    if (image) {
      return this.updateBannerWithImage(data);
    }

    const dataToUpdate = { ...data, image_url: undefined };
    return this.updateBanner(dataToUpdate).pipe(
      this.genericPipeToUpdate(data.settings),
    );
  }

  private updateBannerWithImage(data: {
    id: string;
    image?: File;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
    typePromotion: PromotionType;
  }) {
    const { image } = data;

    if (!image) {
      throw new Error('Image is required');
    }

    const formData = new FormData();
    formData.append('file', image);

    return this.bannerService.uploadBannerImage(formData).pipe(
      mergeMap(({ image_url }) => {
        const dataToUpdate = { ...data, image_url };

        return this.updateBanner(dataToUpdate);
      }),
      this.genericPipeToUpdate(data.settings),
    );
  }

  private updateBanner(data: {
    id: string;
    form: PromotionFormDto;
    settings: PromotionFormSettingsDto;
    typePromotion: PromotionType;
    image_url?: string;
  }) {
    const { id, form, image_url } = data;

    const commerces = form.commerces ?? [];

    const formValue = { ...form };

    delete formValue.commerces;

    let body = {};

    if (form.type_promotion === PromotionType.BANNER) {
      body = this.getBodyByBanner(formValue, commerces, image_url);
    }

    if (form.type_promotion === PromotionType.PROMOTION) {
      body = this.getBodyByPromotion(formValue, commerces, image_url);
    }

    if (form.type_promotion === PromotionType.BANNER_AND_PROMOTION) {
      body = this.getBodyByBannderAndPromotion(formValue, commerces, image_url);
    }

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
      tap(() => this.modalService.dismissAll()),
      first(),
    );
  }
}
