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
import { ActionType, PromotionType } from '@app/pages/clients/shared';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { ToastService } from '@app/shared/services';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { finalize } from 'rxjs';
import { PromotionsService } from '../../data-access/promotions.service';
import {
  PromotionFormDto,
  PromotionFormSettingsDto,
} from '../../dtos/promotion-form.dto';
import { Commerces } from '../../enums/commerces.enum';

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
  providers: [BannersService, PromotionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionComponent implements OnInit {
  @Input() promotionToEdit: BannerDto | undefined;

  private readonly fb = inject(FormBuilder);
  private readonly promotionsService = inject(PromotionsService);

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

    const settings: PromotionFormSettingsDto = {
      modal: {
        title: 'Confirmar',
        message: '¿Está seguro que desea crear la promoción?',
        primaryButtonText: 'Confirmar',
        secondaryButtonText: 'Cancelar',
      },
      toast: {
        errorMessage: 'Error al crear promoción',
        successMessage: 'Promoción creado correctamente',
      },
    };

    this.isLoading.set(true);
    const saveForm$ = await this.promotionsService.saveForm({
      image: this.previewImage,
      form: this.promotionForm.value as PromotionFormDto,
      settings,
      typePromotion: PromotionType.PROMOTION,
    });

    saveForm$?.pipe(finalize(() => this.isLoading.set(false))).subscribe();
  }
  async updateForm() {
    if (this.promotionForm.invalid) {
      throw new Error('Formulario invalido');
    }

    const settings: PromotionFormSettingsDto = {
      modal: {
        title: 'Confirmar',
        message: '¿Está seguro que desea actualizar la promoción?',
        primaryButtonText: 'Confirmar',
        secondaryButtonText: 'Cancelar',
      },
      toast: {
        errorMessage: 'Error al actualizar promoción',
        successMessage: 'Promoción actualizado correctamente',
      },
    };

    this.isLoading.set(true);
    const updateForm$ = await this.promotionsService.updateForm({
      image: this.previewImage ?? undefined,
      form: this.promotionForm.value as PromotionFormDto,
      settings,
      typePromotion: PromotionType.PROMOTION,
      id: this.promotionToEdit?.id ?? '',
    });

    updateForm$?.pipe(finalize(() => this.isLoading.set(false))).subscribe();
  }
}
