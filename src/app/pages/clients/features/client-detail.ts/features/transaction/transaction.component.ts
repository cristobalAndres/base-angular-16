import { Component, effect, inject } from '@angular/core';
import { ClientDetailServiceComponentService } from '@app/pages/clients/data-access';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  private clientDetailService = inject(ClientDetailServiceComponentService);

  protected paymentsMethodsIdSelected: string[] = [];

  constructor() {
    effect(() => {
      this.loadIdsSelected();
    });
  }

  loadIdsSelected() {
    this.paymentsMethodsIdSelected = this.clientDetailService
      .paymenthsMethodsList()
      .filter((payment) => payment.is_selected)
      .map((payment) => payment.id);

    // eslint-disable-next-line no-console
    console.log(this.paymentsMethodsIdSelected);
  }
}
