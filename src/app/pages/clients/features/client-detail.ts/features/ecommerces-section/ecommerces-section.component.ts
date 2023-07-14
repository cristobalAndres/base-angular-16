import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { EcommerceDto } from '@app/pages/clients/shared';
import { EcommerceListDto } from '@app/pages/clients/shared/dtos/ecommerce-list.dto';
import { ClientDeatilEcommercesTableComponent } from '@app/pages/clients/ui';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner';
import { PaginationComponent } from '@app/shared/components/tables';
import { BadgeColors } from '@app/shared/enums';
import { getDate, getTime } from '@app/shared/helpers';
import { EcommercesDataService } from '../../data-access';
import { ClientsDataService } from '../../data-access/clients-data-service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ClientDeatilEcommercesTableComponent,
    SpinnerComponent,
  ],
  selector: 'app-ecommerces-section',
  templateUrl: './ecommerces-section.component.html',
  styleUrls: ['./ecommerces-section.component.scss'],
})
export class EcommercesSectionComponent {
  private clientDataService = inject(ClientsDataService);
  private ecommerceDataService = inject(EcommercesDataService);

  protected readonly client = this.clientDataService.client.asReadonly();

  protected readonly ecommercesResponse =
    this.ecommerceDataService.ecommercesServiceResponse.asReadonly();
  protected readonly isEcommercesLoading =
    this.ecommerceDataService.isLoading.asReadonly();
  protected readonly ecommercesPerPage = this.ecommerceDataService.perPage;

  protected ecommerceList: EcommerceListDto[] = [];

  constructor() {
    effect(() => {
      this.loadEcommerceList();
    });
  }

  protected async onEcommerceCurrentPageChange(currentPage: number) {
    this.ecommerceDataService.currentPage.set(currentPage);
    await this.ecommerceDataService.loadEcommerces(
      this.client()?.dynamo!.id?.s,
    );
  }

  private loadEcommerceList() {
    this.ecommerceList =
      this.ecommercesResponse()?.ecommerces.map((ecommerce) => {
        return {
          id: ecommerce.id ?? '',
          channel: ecommerce.channel ?? '',
          email: ecommerce.email ?? '',
          timestamp: ecommerce.timestamp
            ? `${getDate(ecommerce.timestamp)} ${getTime(ecommerce.timestamp)}`
            : '',
          statusValue: this.getStatusAndColorOfEcommerce(ecommerce).status,
          statusColor: this.getStatusAndColorOfEcommerce(ecommerce).color,
        };
      }) ?? [];
  }

  private getStatusAndColorOfEcommerce = (ecommerce: EcommerceDto) => {
    if (ecommerce.link_id && ecommerce.payment_method_enabled) {
      return { color: BadgeColors.SUCCESS, status: 'OK' };
    }

    if (ecommerce.link_id && !ecommerce.payment_method_enabled) {
      return { color: BadgeColors.DANGER, status: 'NOK' };
    }

    return { color: BadgeColors.SECONDARY, status: 'No vinculado' };
  };
}
