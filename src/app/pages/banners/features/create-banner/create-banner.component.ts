import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import { PromotionType } from '@app/pages/clients/shared';
import { SelectionDto } from '@app/shared/components/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerDto } from '../../shared/dtos/banner-dto';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBannerComponent {
  @Input() promotionToEdit: BannerDto | undefined;

  private readonly modalService = inject(NgbModal);

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

  PROMOTION_OPTIONS = PromotionType;
  promotionTypeSelected = signal<PromotionType | undefined>(undefined);

  public options: SelectionDto[] = [
    { value: this.PROMOTION_OPTIONS.BANNER, label: 'Banner' },
    { value: this.PROMOTION_OPTIONS.PROMOTION, label: 'Promotion' },
    {
      value: this.PROMOTION_OPTIONS.BANNER_AND_PROMOTION,
      label: 'Banner and Promotion',
    },
  ];

  onChangePromotionType(promotionType: string | undefined) {
    this.promotionTypeSelected.set(promotionType as PromotionType);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
