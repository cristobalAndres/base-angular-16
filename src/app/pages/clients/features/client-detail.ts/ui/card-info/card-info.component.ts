import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { CardInfoDataDto } from '../../../../shared/dtos/card-info-data.dto';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [CommonModule, DefaultBadgeComponent],
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) data!: CardInfoDataDto[];

  @Input() isLoading = false;
  @Input() elementCount = 3;
}
