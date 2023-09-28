import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@app/shared/components/forms';
import { ReactiveFormInputTextComponent } from '@app/shared/components/reactive-form';
import { CreateBannerComponent } from './create-banner.component';
import { BannerAndPromotionComponent } from './features/banner-and-promotion/banner-and-promotion.component';
import { BannerComponent } from './features/banner/banner.component';
import { PromotionComponent } from './features/promotion/promotion.component';

@NgModule({
  declarations: [CreateBannerComponent],
  imports: [
    CommonModule,
    ReactiveFormInputTextComponent,
    ReactiveFormsModule,
    BannerComponent,
    PromotionComponent,
    BannerAndPromotionComponent,
    SelectComponent,
  ],
})
export class CreateBannerModule {}
