import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@app/shared/components/forms';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateBannerComponent } from './create-banner.component';
import { CommonFormComponent } from './features/common-form/common-form.component';
import { ImageFormComponent } from './features/images-form/images-form.component';
import { PromotionComponent } from './features/promotion/promotion.component';

@NgModule({
  declarations: [CreateBannerComponent],
  imports: [
    CommonModule,
    ReactiveFormInputTextComponent,
    ReactiveFormsModule,
    PromotionComponent,

    SelectComponent,
    NgbAccordionModule,
    NgbAlertModule,
    CommonFormComponent,
    ImageFormComponent,
  ],
})
export class CreateBannerModule {}
