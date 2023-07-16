import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
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

  protected readonly client = this.clientDataService.client;

  ecommercesPerPage = this.ecommerceDataService.perPage;

  protected readonly ecommercesResponseSig =
    this.ecommerceDataService.ecommercesServiceResponse;
  protected readonly isEcommercesLoadingSig =
    this.ecommerceDataService.isLoading;
  protected readonly ecommercesPerPageSig = this.ecommerceDataService.perPage;

  protected ecommerceList: EcommerceListDto[] = [];

  constructor() {
    toObservable(this.ecommercesResponseSig)
      .pipe(takeUntilDestroyed())
      .subscribe((ecommerceResponse) => {
        if (ecommerceResponse.ecommerces.length == 0) this.ecommerceList = [];
        this.ecommerceList = this.loadEcommerceList(
          ecommerceResponse.ecommerces,
        );
      });
  }

  protected onEcommerceCurrentPageChange(currentPage: number) {
    this.ecommerceDataService.changePage(currentPage);
  }

  private loadEcommerceList(ecommerces: EcommerceDto[]) {
    return (
      ecommerces.map((ecommerce) => {
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
      }) ?? []
    );
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
