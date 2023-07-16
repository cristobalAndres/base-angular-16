import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  EcommercesDataService,
  PaymentMethodsDataService,
} from './data-access';
import { ClientsDataService } from './data-access/clients-data-service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private clientDataService = inject(ClientsDataService);
  private ecommerceDataService = inject(EcommercesDataService);
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);

  private routeParamsSub: Subscription | undefined;

  protected readonly client = this.clientDataService.client;

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe((params: Params) => {
      const { id } = params;
      void this.loadData(id as string);
    });
  }

  async loadData(clientId: string): Promise<void> {
    await Promise.all([
      this.clientDataService.loadClient(clientId),
      this.paymentsMethodsDataService.loadPaymentsMethodsOfClient(clientId),
    ]);
  }

  ngOnDestroy(): void {
    this.clientDataService.cleanData();
    this.ecommerceDataService.cleanData();
    this.paymentsMethodsDataService.cleanData();
    this.routeParamsSub?.unsubscribe();
  }
}
