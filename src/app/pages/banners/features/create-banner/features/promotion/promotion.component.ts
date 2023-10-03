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
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { PromotionsService } from '../../data-access/promotions.service';
import { PromotionFormData } from '../../dtos/promotion-form-controls.dto copy';

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
export class PromotionComponent implements OnInit, OnDestroy {
  @Input() promotionToEdit: BannerDto | undefined;
  @Output() formChanges = new EventEmitter<PromotionFormData>();

  private readonly fb = inject(FormBuilder);
  valuesChanges$: Subscription | undefined = undefined;

  promotionForm = this.fb.group({
    main_text: ['', [Validators.required, Validators.minLength(3)]],
    terms_and_conditions: ['', Validators.required],
    action_button_title: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.promotionToEdit) {
      this.promotionForm.setValue({
        main_text: this.promotionToEdit.main_text ?? '',
        terms_and_conditions: this.promotionToEdit.terms_and_conditions ?? '',
        action_button_title: this.promotionToEdit.action_button_title ?? '',
      });
    }

    this.valuesChanges$ = this.promotionForm.valueChanges.subscribe((value) => {
      this.formChanges.emit({
        values: value,
        isValid: this.promotionForm.valid,
      });
    });

    this.promotionForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.valuesChanges$?.unsubscribe();
  }
}
