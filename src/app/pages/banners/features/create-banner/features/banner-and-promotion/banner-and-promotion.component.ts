import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import {
  ActionType,
  CreateBannerDto,
  PromotionType,
} from '@app/pages/clients/shared';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { catchError, first, mergeMap, tap } from 'rxjs';
import { Commerces } from '../../dtos/commerces.enum';

@Component({
  selector: 'app-banner-and-promotion',
  templateUrl: './banner-and-promotion.component.html',
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
export class BannerAndPromotionComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly bannerService = inject(BannersService);
  private readonly toastService = inject(ToastService);
  private readonly modalService = inject(NgbModal);

  isLoading = signal(false);

  URL = URL;

  action_types = [
    { id: ActionType.WEBVIEW, name: 'Website' },
    { id: ActionType.DETAIL, name: 'Detalle' },
  ];

  previewImage: File | null = null;

  dropdownList: ListItem[] = [];
  selectedItems: ListItem[] = [];
  dropdownSettings = {};

  bannerAndPromotionForm = this.fb.group({
    id_promotion: ['', [Validators.required, Validators.minLength(3)]],
    title_text: ['', [Validators.required, Validators.minLength(3)]],
    off_text: ['', [Validators.minLength(3)]],
    badge_text: ['', [Validators.required, Validators.minLength(3)]],
    badge_background_color: ['', [Validators.required]],
    image_banner_url: [''],
    image_tile_url: [''],
    action_type: [this.action_types[0].id, Validators.required],
    action_type_url: [''],
    type_promotion: [PromotionType.BANNER_AND_PROMOTION],
    header_text: [''],
    main_text: ['', [Validators.required, Validators.minLength(3)]],
    subtitle_text: [''],
    active: [false],
    from_date: [''],
    to_date: [''],
    country: ['CL'],
    terms_and_conditions: ['', Validators.required],
    action_button_title: ['', Validators.required],
  });

  ngOnInit() {
    this.setSettingsDropDownStores();
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

  onItemSelect(item: ListItem) {
    this.selectedItems.push(item);
  }
  onSelectAll(items: ListItem[]) {
    this.selectedItems = items;
  }
  onItemDeSelect(item: ListItem) {
    this.selectedItems = this.selectedItems.filter((i) => i.id !== item.id);
  }
  onDeSelectAll() {
    this.selectedItems = [];
  }

  saveForm() {
    if (
      this.bannerAndPromotionForm.invalid ||
      this.selectedItems.length === 0 ||
      !this.previewImage
    ) {
      throw new Error('Formulario invalido');
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
          const body = {
            ...this.bannerAndPromotionForm.value,
            image_banner_url: image_url,
            image_tile_url: image_url,
            filter_attributes: this.selectedItems.map((i) => i.id.toString()),
          };
          return this.bannerService.createBanner(body as CreateBannerDto);
        }),
        catchError(() => {
          this.isLoading.set(false);
          this.toastService.clear();
          this.toastService.show({
            body: 'Error al crear banner',
            color: ToastsColors.DANGER,
            delay: 5000,
          });
          throw Error('Error al crear banner');
        }),
        tap(() => this.isLoading.set(false)),
        tap(() => this.toastService.clear()),
        tap(() =>
          this.toastService.show({
            body: 'Banner creado correctamente',
            color: ToastsColors.SUCCESS,
            delay: 2000,
          }),
        ),
        tap(() => this.modalService.dismissAll()),
        first(),
      )
      .subscribe();
  }
}
