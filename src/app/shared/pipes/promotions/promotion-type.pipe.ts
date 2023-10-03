import { Pipe, PipeTransform } from '@angular/core';
import { PromotionType } from '@app/pages/clients/shared';

@Pipe({
  name: 'promotionType',
  standalone: true,
})
export class PromotionTypePipe implements PipeTransform {
  static readonly PROMOTIONS_TYPES: Record<PromotionType, string> = {
    [PromotionType.BANNER]: 'Banner',
    [PromotionType.PROMOTION]: 'Promoción',
    [PromotionType.BANNER_AND_PROMOTION]: 'Banner y Promoción',
  };

  transform(promotionType?: PromotionType): string | undefined {
    if (!promotionType) return;

    return PromotionTypePipe.PROMOTIONS_TYPES[promotionType] ?? promotionType;
  }
}
