import { DatePipe } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ClientsService } from '@app/pages/clients/data-access';
import { CardsResponse, PaymentsMethodsType } from '@app/pages/clients/shared';
import { PaymentsMethodsListDto } from '@app/pages/clients/shared/dtos/payments-methods-list.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentMethodsDataService {
  private readonly datePipe = inject(DatePipe);
  private readonly clientsService = inject(ClientsService);

  private isLoadingSig = signal(false);
  private hasErrorSig = signal(false);
  private paymentsMethodsResponseSig = signal<CardsResponse | undefined>(
    undefined,
  );
  private isAllPaymentMethodsSelectedSig = signal(false);
  private paymenthsMethodsListSig = signal<PaymentsMethodsListDto[]>([]);

  private readonly selectedPaymentMethodIdsSig = signal<
    Set<PaymentsMethodsListDto['id']>
  >(new Set());

  readonly isLoading = computed(() => this.isLoadingSig());
  readonly hasError = computed(() => this.hasErrorSig());
  readonly paymentsMethodsResponse = computed(() =>
    this.paymentsMethodsResponseSig(),
  );
  readonly isAllPaymentMethodsSelected = computed(() =>
    this.isAllPaymentMethodsSelectedSig(),
  );
  readonly paymenthsMethodsList = computed(() =>
    this.paymenthsMethodsListSig(),
  );
  readonly selectedPaymentMethodIds = computed(
    this.selectedPaymentMethodIdsSig,
  );

  async loadPaymentsMethodsOfClient(clientId: string) {
    this.isLoadingSig.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getCards(clientId),
      );
      this.paymentsMethodsResponseSig.set(result);
      this.loadPaymentsMethodsList();
      this.hasErrorSig.set(false);
    } catch (error) {
      this.hasErrorSig.set(true);
    } finally {
      this.isLoadingSig.set(false);
    }
  }

  loadPaymentsMethodsList() {
    const accountsInPaymentMethodsListDto =
      this.paymentsMethodsResponseSig()?.accounts.map((account) => {
        return {
          id: account.account_id.toString(),
          mask: '',
          brand: 'CencoPay',
          card_type: 'Wallet',
          is_active: account?.enabled_account,
          added_at: account.created_at,
          is_selected: this.isAllPaymentMethodsSelectedSig(),
          payment_method_type: PaymentsMethodsType.ACCOUNT,
        } as PaymentsMethodsListDto;
      });
    const cardsInPaymentMethodsListDto =
      this.paymentsMethodsResponseSig()?.cards.map((card) => {
        return {
          id: card.card_id.toString(),
          mask: card?.mask,
          brand: card?.brand,
          card_type: card?.card_type,
          is_active: !card?.deleted_at,
          is_inherited: card?.is_inherited,
          added_at: card?.added_at,
          is_selected: this.isAllPaymentMethodsSelectedSig(),
          payment_method_type: PaymentsMethodsType.CARD,
          deleted_at: this.datePipe.transform(card?.deleted_at, 'medium'),
        } as PaymentsMethodsListDto;
      });

    const updatePaymenthsMethodsList = [
      ...(accountsInPaymentMethodsListDto ?? []),
      ...(cardsInPaymentMethodsListDto ?? []),
    ];

    this.paymenthsMethodsListSig.set(updatePaymenthsMethodsList);
    this.toggleSelectAllPaymentMethods();
  }

  toggleSelectedPaymentMethodId(id: PaymentsMethodsListDto['id']) {
    this.selectedPaymentMethodIdsSig.update((selected) => {
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      return selected;
    });

    this.isAllPaymentMethodsSelectedSig.set(
      this.selectedPaymentMethodIdsSig().size ==
        this.paymenthsMethodsListSig().length,
    );
  }

  toggleSelectAllPaymentMethods() {
    if (this.isAllPaymentMethodsSelectedSig())
      this.selectedPaymentMethodIdsSig.set(new Set());
    else
      this.selectedPaymentMethodIdsSig.set(
        new Set(this.paymenthsMethodsListSig().map(({ id }) => id)),
      );

    this.isAllPaymentMethodsSelectedSig.update(
      (areAllSelected) => !areAllSelected,
    );
  }

  cleanData() {
    this.isLoadingSig.set(false);
    this.hasErrorSig.set(false);
    this.paymentsMethodsResponseSig.set(undefined);
    this.isAllPaymentMethodsSelectedSig.set(false);
    this.selectedPaymentMethodIdsSig.set(new Set());
  }
}
