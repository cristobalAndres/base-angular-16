import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannersService } from '@app/pages/banners/data-access/banners-service';
import {
  ReactiveFormInputImageComponent,
  ReactiveFormInputTextComponent,
} from '@app/shared/components/reactive-form';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { PromotionsService } from '../../data-access/promotions.service';
import { FileTypes } from '../../enums/file-types.enum';

@Component({
  selector: 'app-image-form',
  templateUrl: './images-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormInputTextComponent,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    ReactiveFormInputImageComponent,
  ],
  providers: [BannersService, PromotionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFormComponent implements OnInit, OnChanges, OnDestroy {
  private readonly fb = inject(FormBuilder);
  FILETYPES = FileTypes;

  @Input() showBanner = false;
  @Input() isBannerRequired = false;
  @Input() previewBannerImageURL: string | undefined;
  @Input() showPromotion = false;
  @Input() isPromotionRequired = false;
  @Input() previewPromotionImageURL: string | undefined;

  @Output() bannerFileChange = new EventEmitter<File | null>();
  @Output() promotionFileChange = new EventEmitter<File | null>();
  @Output() isValidForm = new EventEmitter<boolean>();

  showComponent = signal(true);

  changes$: Subscription | undefined = undefined;

  imageForm = this.fb.group({
    banner_image: [null],
    promotion_image: [null],
  });

  ngOnInit() {
    this.changes$ = this.imageForm.valueChanges.subscribe(() => {
      this.isValidForm.emit(this.imageForm.valid);
    });
    this.checkValidationAndUpdateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showComponent.set(false);
    if (changes['isBannerRequired'] || changes['isPromotionRequired']) {
      this.checkValidationAndUpdateForm();
    }
    this.showComponent.set(true);
  }

  checkValidationAndUpdateForm() {
    this.imageForm.setValue({
      banner_image: null,
      promotion_image: null,
    });

    if (this.isBannerRequired) {
      this.imageForm.get('banner_image')?.setValidators([Validators.required]);
      this.imageForm
        .get('promotion_image')
        ?.setValidators([Validators.nullValidator]);
    }
    if (this.isPromotionRequired) {
      this.imageForm
        .get('promotion_image')
        ?.setValidators([Validators.required]);
      this.imageForm
        .get('banner_image')
        ?.setValidators([Validators.nullValidator]);
    }

    if (this.isBannerRequired && this.isPromotionRequired) {
      this.imageForm.get('banner_image')?.setValidators([Validators.required]);
      this.imageForm
        .get('promotion_image')
        ?.setValidators([Validators.required]);
    }
    this.imageForm.get('banner_image')?.updateValueAndValidity();
    this.imageForm.get('promotion_image')?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.changes$?.unsubscribe();
  }

  onFileChange(file: File | null, type: FileTypes) {
    if (type === FileTypes.BANNER_IMAGE) {
      return this.bannerFileChange.emit(file);
    }

    if (type === FileTypes.PROMOTION_IMAGE) {
      return this.promotionFileChange.emit(file);
    }

    throw new Error('Invalid file type');
  }
}
