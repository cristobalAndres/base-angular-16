import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import { BannerDto } from '@app/pages/banners/shared/dtos/banner-dto';
import {
  ActionType,
  CreateBannerDto,
  PromotionType,
  UpdateBannerRequestDto,
} from '@app/pages/clients/shared';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ConfirmModalResponse } from '@app/shared/services/modals/confirm-modal/enums/confirm-moda-respnse.enum';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { catchError, first, mergeMap, pipe, tap } from 'rxjs';
import { Commerces } from '../../dtos/commerces.enum';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormInputTextComponent,
    NgMultiSelectDropDownModule,
  ],
  providers: [BannersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionComponent implements OnInit {
  @Input() promotionToEdit: BannerDto | undefined;

  private readonly fb = inject(FormBuilder);
  private readonly bannerService = inject(BannersService);
  private readonly toastService = inject(ToastService);
  private readonly modalService = inject(NgbModal);
  private readonly confirmModalService = inject(ConfirmModalService);

  isLoading = signal(false);

  URL = URL;

  action_types = [
    { id: ActionType.WEBVIEW, name: 'Website' },
    { id: ActionType.DETAIL, name: 'Detalle' },
  ];

  previewImage: File | null = null;
  imageBannerUrl = signal<string | undefined>(undefined);

  dropdownList: ListItem[] = [];
  dropdownSettings = {};

  promotionForm = this.fb.group({
    id_promotion: ['', [Validators.required, Validators.minLength(3)]],
    title_text: ['', [Validators.required, Validators.minLength(3)]],
    off_text: ['', [Validators.minLength(3)]],
    badge_text: ['', [Validators.required, Validators.minLength(3)]],
    badge_background_color: ['', [Validators.required]],
    image_tile_url: [''],
    action_type: [this.action_types[0].id, Validators.required],
    action_type_url: [''],
    type_promotion: [PromotionType.PROMOTION],
    header_text: [''],
    main_text: ['', [Validators.required, Validators.minLength(3)]],
    subtitle_text: [''],
    active: [false],
    from_date: [''],
    to_date: [''],
    country: ['CL'],
    terms_and_conditions: ['', Validators.required],
    action_button_title: ['', Validators.required],
    commerces: [[] as ListItem[], [Validators.required]],
  });

  ngOnInit() {
    this.setSettingsDropDownStores();

    if (this.promotionToEdit) {
      this.promotionForm.setValue({
        id_promotion: this.promotionToEdit.id_promotion,
        title_text: this.promotionToEdit.title_text,
        off_text: this.promotionToEdit.off_text ?? '',
        badge_text: this.promotionToEdit.badge_text,
        badge_background_color: this.promotionToEdit.badge_background_color,
        image_tile_url: this.promotionToEdit.image_tile_url ?? '',
        action_type: this.promotionToEdit.action_type,
        action_type_url: this.promotionToEdit.action_type_url ?? '',
        type_promotion: this.promotionToEdit.type_promotion,
        header_text: this.promotionToEdit.header_text ?? '',
        main_text: this.promotionToEdit.main_text ?? '',
        subtitle_text: this.promotionToEdit.subtitle_text ?? '',
        active: this.promotionToEdit.active,
        from_date: new Date(this.promotionToEdit.from_date)
          .toISOString()
          .split('T')[0],
        to_date: new Date(this.promotionToEdit.to_date)
          .toISOString()
          .split('T')[0],
        country: this.promotionToEdit.country,
        terms_and_conditions: this.promotionToEdit.terms_and_conditions ?? '',
        action_button_title: this.promotionToEdit.action_button_title ?? '',
        commerces: this.dropdownList.filter((i) => {
          return Array.from(
            this.promotionToEdit?.filter_attributes ?? [],
          ).includes(i.id.toString());
        }),
      });

      this.imageBannerUrl.set(this.promotionToEdit.image_tile_url);
    }
  }

  setSettingsDropDownStores() {
    this.dropdownList = [
      { id: Commerces.JUMBO, text: 'Jumbo' },
      { id: Commerces.EASY, text: 'Easy' },
      { id: Commerces.SANTA_ISABEL, text: 'Santa Isabel' },
      { id: Commerces.SPID, text: 'SPID' },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Desmarcar Todos',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
    };
  }

  onFileChange(event: Event) {
    const img = (event.target as HTMLInputElement).files?.item(0);
    if (!img) {
      this.previewImage = null;
      return;
    }
    this.previewImage = img;
  }

  async saveForm() {
    if (this.promotionForm.invalid || !this.previewImage) {
      throw new Error('Formulario invalido');
    }

    const result = await this.confirmModalService.open({
      title: 'Confirmar',
      message: '¿Está seguro que desea crear el banner?',
      primaryButtonText: 'Confirmar',
      secondaryButtonText: 'Cancelar',
    });

    if (result === ConfirmModalResponse.SECONDARY_BUTTON_CLICKED) {
      return;
    }

    this.isLoading.set(true);
    this.toastService.show({
      body: 'Cargando...',
      color: ToastsColors.PRIMARY,
      delay: 20000,
    });

    const formData = new FormData();
    formData.append('file', this.previewImage);

    this.bannerService
      .uploadBannerImage(formData)
      .pipe(
        mergeMap(({ image_url }) => {
          const commerces = this.promotionForm.get('commerces')?.value ?? [];

          const formValue = { ...this.promotionForm.value };

          delete formValue.commerces;

          const body = {
            ...formValue,
            image_tile_url: image_url,
            filter_attributes: commerces?.map((i) => i.id.toString()),
          };
          return this.bannerService.createBanner(body as CreateBannerDto);
        }),
        catchError(() => {
          this.isLoading.set(false);
          this.toastService.clear();
          this.toastService.show({
            body: 'Error al crear promotion',
            color: ToastsColors.DANGER,
            delay: 5000,
          });
          throw Error('Error al crear promotion');
        }),
        tap(() => this.isLoading.set(false)),
        tap(() => this.toastService.clear()),
        tap(() =>
          this.toastService.show({
            body: 'Promotion creado correctamente',
            color: ToastsColors.SUCCESS,
            delay: 2000,
          }),
        ),
        tap(() => this.modalService.dismissAll()),
        first(),
      )
      .subscribe();
  }

  async updateForm() {
    if (this.promotionForm.invalid) {
      throw new Error('Formulario invalido');
    }

    const result = await this.confirmModalService.open({
      title: 'Confirmar',
      message: '¿Está seguro que desea actualizar el promotion?',
      primaryButtonText: 'Confirmar',
      secondaryButtonText: 'Cancelar',
    });

    if (result === ConfirmModalResponse.SECONDARY_BUTTON_CLICKED) {
      return;
    }

    this.isLoading.set(true);
    this.toastService.show({
      body: 'Cargando...',
      color: ToastsColors.PRIMARY,
      delay: 20000,
    });

    if (this.previewImage) {
      return this.updateBannerWithImage().subscribe();
    }

    return this.updateBanner(undefined)
      .pipe(this.genericPipeToUpdate())
      .subscribe();
  }

  updateBannerWithImage() {
    if (!this.previewImage) {
      throw new Error('Image is required');
    }

    const formData = new FormData();
    formData.append('file', this.previewImage);

    return this.bannerService.uploadBannerImage(formData).pipe(
      mergeMap(({ image_url }) => {
        return this.updateBanner(image_url);
      }),
      this.genericPipeToUpdate(),
    );
  }

  updateBanner(image_url: string | undefined) {
    const commerces = this.promotionForm.get('commerces')?.value ?? [];

    const formValue = { ...this.promotionForm.value };

    delete formValue.commerces;

    const body = {
      ...formValue,
      image_tile_url: image_url ?? this.promotionToEdit?.image_tile_url,
      filter_attributes: commerces?.map((i) => i.id.toString()),
    };

    return this.bannerService.updateBannerById(
      this.promotionToEdit?.id ?? '',
      body as UpdateBannerRequestDto,
    );
  }

  genericPipeToUpdate() {
    return pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastService.clear();
        this.toastService.show({
          body: 'Error al actualizar promotion',
          color: ToastsColors.DANGER,
          delay: 5000,
        });
        throw Error('Error al actualizar promotion');
      }),
      tap(() => this.isLoading.set(false)),
      tap(() => this.toastService.clear()),
      tap(() =>
        this.toastService.show({
          body: 'Promotion actualizado correctamente',
          color: ToastsColors.SUCCESS,
          delay: 2000,
        }),
      ),
      tap(() => this.modalService.dismissAll()),
      first(),
    );
  }
}
