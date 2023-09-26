import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { PromotionType } from '@app/pages/clients/shared';
import { SelectionDto } from '@app/shared/components/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBannerComponent {
  private readonly modalService = inject(NgbModal);

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
