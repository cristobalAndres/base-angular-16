import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import { BannerDto } from '@app/pages/banners/shared/dtos/banner-dto';
import { ActionType } from '@app/pages/clients/shared';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Subscription } from 'rxjs';
import { PromotionsService } from '../../data-access/promotions.service';
import { CommonFormData } from '../../dtos/common-form-controls.dto';
import { Commerces } from '../../enums/commerces.enum';

@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
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
export class CommonFormComponent implements OnInit, OnDestroy {
  @Input() promotionToEdit: BannerDto | undefined;
  @Output() formChanges = new EventEmitter<CommonFormData>();

  private readonly fb = inject(FormBuilder);

  valuesChanges$: Subscription | undefined = undefined;

  action_types = [
    { id: ActionType.WEBVIEW, name: 'Website' },
    { id: ActionType.DETAIL, name: 'Detalle' },
  ];

  dropdownList: ListItem[] = [];
  dropdownSettings = {};

  commonForm = this.fb.group({
    id_promotion: ['', [Validators.required, Validators.minLength(3)]],
    title_text: ['', [Validators.required, Validators.minLength(3)]],
    off_text: ['', [Validators.minLength(3)]],
    badge_text: ['', [Validators.required, Validators.minLength(3)]],
    badge_background_color: ['', [Validators.required]],
    action_type: [this.action_types[0].id, Validators.required],
    action_type_url: [''],
    header_text: [''],
    subtitle_text: [''],
    active: [false],
    from_date: ['', Validators.required],
    to_date: ['', Validators.required],
    country: ['CL'],
    commerces: [[] as ListItem[], [Validators.required]],
    priority: [0],
  });

  ngOnInit() {
    this.setSettingsDropDownStores();

    if (this.promotionToEdit) {
      this.commonForm.setValue({
        id_promotion: this.promotionToEdit.id_promotion,
        title_text: this.promotionToEdit.title_text,
        off_text: this.promotionToEdit.off_text ?? '',
        badge_text: this.promotionToEdit.badge_text,
        badge_background_color: this.promotionToEdit.badge_background_color,
        action_type: this.promotionToEdit.action_type,
        action_type_url: this.promotionToEdit.action_type_url ?? '',
        header_text: this.promotionToEdit.header_text ?? '',
        subtitle_text: this.promotionToEdit.subtitle_text ?? '',
        active: this.promotionToEdit.active,
        from_date: new Date(this.promotionToEdit.from_date)
          .toISOString()
          .split('T')[0],
        to_date: new Date(this.promotionToEdit.to_date)
          .toISOString()
          .split('T')[0],
        country: this.promotionToEdit.country,
        commerces: this.dropdownList.filter((i) => {
          return Array.from(
            this.promotionToEdit?.filter_attributes ?? [],
          ).includes(i.id.toString());
        }),
        priority: this.promotionToEdit.priority ?? 0,
      });
    }

    this.valuesChanges$ = this.commonForm.valueChanges.subscribe((value) => {
      this.formChanges.emit({
        values: value,
        isValid: this.commonForm.valid,
      });
    });

    this.checkActionUrlValidators(
      this.commonForm.get('action_type')?.value ?? '',
    );
  }

  ngOnDestroy(): void {
    this.valuesChanges$?.unsubscribe();
  }

  addActionTypeURlValidators(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.checkActionUrlValidators(value);
  }

  checkActionUrlValidators(value: string) {
    if (value === ActionType.WEBVIEW) {
      this.commonForm
        .get('action_type_url')
        ?.setValidators([
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?.*',
          ),
        ]);
    } else {
      this.commonForm.get('action_type_url')?.clearValidators();
    }
    this.commonForm.get('action_type_url')?.updateValueAndValidity();
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
}
