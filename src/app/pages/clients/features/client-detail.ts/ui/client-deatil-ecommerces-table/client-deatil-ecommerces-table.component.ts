import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { EcommerceListDto } from '../../../../shared/dtos/ecommerce-list.dto';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultBadgeComponent],
  selector: 'app-client-deatil-ecommerces-table',
  templateUrl: './client-deatil-ecommerces-table.component.html',
  styleUrls: ['./client-deatil-ecommerces-table.component.scss'],
})
export class ClientDeatilEcommercesTableComponent {
  @Input({ required: true }) ecommerces!: ReadonlyArray<EcommerceListDto>;
}
