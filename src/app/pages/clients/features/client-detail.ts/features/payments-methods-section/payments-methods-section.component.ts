import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentsMethodsTableComponent } from '@app/pages/clients/features/client-detail.ts/ui/paymenths-methods-table';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner';
import { PaymentMethodsDataService } from '../../data-access';

@Component({
  standalone: true,
  imports: [CommonModule, PaymentsMethodsTableComponent, SpinnerComponent],
  selector: 'app-payments-methods-section',
  templateUrl: './payments-methods-section.component.html',
  styleUrls: ['./payments-methods-section.component.scss'],
})
export class PaymentsMethodsSectionComponent {
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);

  protected readonly isLoading = this.paymentsMethodsDataService.isLoading;
  protected readonly paymentsMethodsResponse =
    this.paymentsMethodsDataService.paymentsMethodsResponse;
  protected paymenthsMethodsList =
    this.paymentsMethodsDataService.paymenthsMethodsList;
  protected isAllPaymentMethodsSelected =
    this.paymentsMethodsDataService.isAllPaymentMethodsSelected;

  protected selectedPaymentMethodIds =
    this.paymentsMethodsDataService.selectedPaymentMethodIds;

  onAllPaymentMethodsCheck() {
    this.paymentsMethodsDataService.toggleSelectAllPaymentMethods();
  }

  onOnePaymentMethodsChek(id: string) {
    this.paymentsMethodsDataService.toggleSelectedPaymentMethodId(id);
  }
}
