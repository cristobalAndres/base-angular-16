import { Component, effect, inject } from '@angular/core';
import { PaymentsMethodsType } from '@app/pages/clients/shared';
import { PaymentMethodsDataService } from '../../data-access';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);

  protected paymentsMethodsIdSelected: {
    id: string;
    type: PaymentsMethodsType;
  }[] = [];

  constructor() {
    effect(() => {
      this.loadIdsSelected();
    });
  }

  loadIdsSelected() {
    this.paymentsMethodsIdSelected = this.paymentsMethodsDataService
      .paymenthsMethodsList()
      .filter((payment) => payment.is_selected)
      .map((payment) => {
        return { id: payment.id, type: payment.payment_method_type };
      });

    // eslint-disable-next-line no-console
    console.log(this.paymentsMethodsIdSelected);
  }
}
