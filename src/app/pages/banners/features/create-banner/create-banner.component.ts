import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CreateBannerDto, PromotionType } from '@app/pages/clients/shared';
import { SelectionDto } from '@app/shared/components/forms';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ConfirmModalResponse } from '@app/shared/services/modals/confirm-modal/enums/confirm-moda-respnse.enum';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, lastValueFrom } from 'rxjs';
import { BannersService } from '../../data-access/banners-service';
import { BannerDto } from '../../shared/dtos/banner-dto';
import { PromotionsService } from './data-access/promotions.service';
import {
  CommonFormControlDto,
  CommonFormData,
} from './dtos/common-form-controls.dto';
import {
  PromotionFormControlsDto,
  PromotionFormData,
} from './dtos/promotion-form-controls.dto';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBannerComponent implements OnInit {
  @Input() promotionToEdit: BannerDto | undefined;

  private readonly modalService = inject(NgbModal);
  private readonly promotionService = inject(PromotionsService);
  private readonly bannerService = inject(BannersService);
  private readonly confirmModalService = inject(ConfirmModalService);
  private readonly toastService = inject(ToastService);

  isloading = signal(false);

  isValidImagesForm = signal(false);

  isValidCommonForm = signal(false);
  commonFormValues: CommonFormControlDto | undefined;

  isValidPromotionForm = signal(false);
  promotionFormValues: PromotionFormControlsDto | undefined;

  PROMOTION_OPTIONS = PromotionType;
  promotionTypeSelected = signal<PromotionType | undefined>(undefined);

  bannerFile: File | null = null;
  cachedBannerFileUrl: { file: File; url: string } | undefined = undefined;
  promotionFile: File | null = null;
  cachedPromotionFile: { file: File; url: string } | undefined = undefined;

  public options: SelectionDto[] = [
    { value: this.PROMOTION_OPTIONS.BANNER, label: 'Banner' },
    { value: this.PROMOTION_OPTIONS.PROMOTION, label: 'Promotion' },
    {
      value: this.PROMOTION_OPTIONS.BANNER_AND_PROMOTION,
      label: 'Banner and Promotion',
    },
  ];

  get TypePromotion(): string {
    if (!this.promotionToEdit && this.options) return '';

    return (
      (this.options ?? [])
        .filter(
          (option) => option.value === this.promotionToEdit?.type_promotion,
        )
        .at(0)?.label ?? ''
    );
  }

  get isPromotionOrBannerAndPromotion(): boolean {
    return (
      this.promotionTypeSelected() === PromotionType.PROMOTION ||
      this.promotionTypeSelected() === PromotionType.BANNER_AND_PROMOTION
    );
  }

  get isValidForm(): boolean {
    if (this.promotionTypeSelected() === undefined) return false;
    if (this.promotionTypeSelected() !== PromotionType.BANNER) {
      return this.isValidCommonForm() && this.isValidPromotionForm();
    }

    return this.isValidCommonForm();
  }

  get isDisabledButton(): boolean {
    return this.isloading() || !this.isValidForm || !this.isValidImagesForm();
  }

  get isBannerRequired(): boolean {
    return (
      !this.promotionToEdit &&
      this.promotionTypeSelected() !== PromotionType.PROMOTION
    );
  }

  get showBanner(): boolean {
    return !!(
      this.promotionTypeSelected() !== PromotionType.PROMOTION ||
      (this.promotionToEdit &&
        this.promotionToEdit?.type_promotion !== PromotionType.PROMOTION)
    );
  }

  get isPromotionRequired(): boolean {
    return (
      !this.promotionToEdit &&
      this.promotionTypeSelected() !== PromotionType.BANNER
    );
  }

  get showPromotion(): boolean {
    return !!(
      this.isPromotionOrBannerAndPromotion ||
      (this.promotionToEdit &&
        this.promotionToEdit?.type_promotion !== PromotionType.BANNER)
    );
  }

  ngOnInit(): void {
    if (this.promotionToEdit) {
      this.promotionTypeSelected.set(this.promotionToEdit.type_promotion);
    }
  }

  onChangePromotionType(promotionType: string | undefined) {
    this.promotionTypeSelected.set(promotionType as PromotionType);
  }

  onBannerFileChange(file: File | null) {
    this.bannerFile = file;
  }
  onPromotionFileChange(file: File | null) {
    this.promotionFile = file;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  commonFormValue(value: CommonFormData) {
    this.isValidCommonForm.set(value.isValid);
    this.commonFormValues = value.values;
  }

  promotionFormValue(value: PromotionFormData) {
    this.isValidPromotionForm.set(value.isValid);
    this.promotionFormValues = value.values;
  }

  imagesFormValue(value: boolean) {
    this.isValidImagesForm.set(value);
  }

  async saveForm() {
    if (!this.isValidForm || !this.promotionTypeSelected()) return;

    const settings = {
      modal: {
        title: 'Confirmación',
        message: '¿Está seguro que desea guardar los cambios?',
        primaryButtonText: 'Guardar',
        secondaryButtonText: 'Cancelar',
      },
      toast: {
        errorMessage: 'Error al guardar los cambios',
        successMessage: 'Cambios guardados correctamente',
      },
    };
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

    const promotionForm = this.promotionFormValues as PromotionFormControlsDto;
    const commonForm = this.commonFormValues as CommonFormControlDto;

    const commerces = commonForm.commerces ?? [];

    this.isloading.set(true);

    const response = await this.uploadFiles();

    const body = {
      ...promotionForm,
      ...commonForm,
      image_banner_url:
        response.bannerFileUrl ?? this.promotionToEdit?.image_banner_url,
      image_tile_url:
        response.promotionFileUrl ?? this.promotionToEdit?.image_tile_url,
      filter_attributes: commerces?.map((i) => i.id.toString()),
      type_promotion: this.promotionTypeSelected(),
    } as CreateBannerDto;

    if (this.promotionToEdit) {
      const update$ = this.promotionService.updateForm({
        id: this.promotionToEdit.id,
        form: body,
        settings,
      });

      update$?.pipe(finalize(() => this.isloading.set(false))).subscribe();
    } else {
      const save$ = this.promotionService.saveForm({
        settings,
        form: body,
      });

      save$?.pipe(finalize(() => this.isloading.set(false))).subscribe();
    }
  }

  async uploadFiles() {
    if (
      this.promotionTypeSelected() !== PromotionType.PROMOTION &&
      this.bannerFile &&
      !this.cachedBannerFileUrl?.file &&
      this.cachedBannerFileUrl?.file !== this.bannerFile
    ) {
      try {
        const result = await lastValueFrom(
          this.bannerService.uploadBannerImage(this.bannerFile),
        );
        this.cachedBannerFileUrl = {
          file: this.bannerFile,
          url: result.image_url,
        };
      } catch (error) {
        this.showToastError('Error al subir la imagen de banner');
        throw new Error('Error al subir la imagen del banner');
      }
    }

    if (
      this.promotionTypeSelected() !== PromotionType.BANNER &&
      this.promotionFile &&
      !this.cachedPromotionFile?.file &&
      this.cachedPromotionFile?.file !== this.promotionFile
    ) {
      try {
        const result = await lastValueFrom(
          this.bannerService.uploadBannerImage(this.promotionFile),
        );
        this.cachedPromotionFile = {
          file: this.promotionFile,
          url: result.image_url,
        };
      } catch (error) {
        this.showToastError('Error al subir la imagen de promotion');
        throw new Error('Error al subir la imagen de promotion');
      }
    }

    return {
      bannerFileUrl: this.cachedBannerFileUrl?.url,
      promotionFileUrl: this.cachedPromotionFile?.url,
    };
  }

  private showToastError(message: string) {
    this.toastService.clear();
    this.toastService.show({
      body: message,
      color: ToastsColors.DANGER,
      delay: 5000,
    });
    this.isloading.set(false);
  }
}
