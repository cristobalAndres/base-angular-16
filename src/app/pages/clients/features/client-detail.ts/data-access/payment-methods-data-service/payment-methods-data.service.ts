import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ClientsService } from '@app/pages/clients/data-access';
import { CardsResponse, PaymentsMethodsType } from '@app/pages/clients/shared';
import { PaymentsMethodsListDto } from '@app/pages/clients/shared/dtos/payments-methods-list.dto';
import { getDate, getTime } from '@app/shared/helpers';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentMethodsDataService {
  private readonly clientsService = inject(ClientsService);

  readonly isLoading = signal(false);
  readonly hasError = signal(false);
  readonly paymentsMethodsResponse: WritableSignal<CardsResponse | undefined> =
    signal(undefined);
  readonly isAllPaymentMethodsSelected = signal(true);
  readonly paymenthsMethodsList: WritableSignal<PaymentsMethodsListDto[]> =
    signal([]);

  private readonly selectedPaymentMethodIdsSig = signal<
    Set<PaymentsMethodsListDto['id']>
  >(new Set());

  readonly selectedPaymentMethodIds = computed(
    this.selectedPaymentMethodIdsSig,
  );

  async loadPaymentsMethodsOfClient(clientId: string) {
    this.isLoading.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getCards(clientId),
      );
      this.paymentsMethodsResponse.set(result);
      this.loadPaymentsMethodsList();
      this.hasError.set(false);
    } catch (error) {
      this.hasError.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  loadPaymentsMethodsList() {
    const accountsInPaymentMethodsListDto =
      this.paymentsMethodsResponse()?.accounts.map((account) => {
        return {
          id: account.id.toString(),
          mask: '',
          brand: 'CencoPay',
          card_type: 'Wallet',
          is_active: account?.enabled_account,
          added_at: `${getDate(account?.created_at)} ${getTime(
            account?.created_at,
          )}`,
          is_selected: this.isAllPaymentMethodsSelected(),
          payment_method_type: PaymentsMethodsType.ACCOUNT,
        } as PaymentsMethodsListDto;
      });
    const cardsInPaymentMethodsListDto =
      this.paymentsMethodsResponse()?.cards.map((card) => {
        return {
          id: card.id.toString(),
          mask: card?.mask,
          brand: card?.brand,
          card_type: card?.card_type,
          is_active: !card?.deleted_at,
          is_inherited: card?.is_inherited,
          added_at: `${getDate(card?.added_at)} ${getTime(card?.added_at)}`,
          is_selected: this.isAllPaymentMethodsSelected(),
          payment_method_type: PaymentsMethodsType.CARD,
          deleted_at: `${getDate(card?.deleted_at)} ${getTime(
            card?.deleted_at,
          )}`,
        } as PaymentsMethodsListDto;
      });

    const updatePaymenthsMethodsList = [
      ...(accountsInPaymentMethodsListDto ?? []),
      ...(cardsInPaymentMethodsListDto ?? []),
    ];

    this.paymenthsMethodsList.set(updatePaymenthsMethodsList);
    updatePaymenthsMethodsList.forEach((paymentMethod) => {
      this.toggleSelectedPaymentMethodId(paymentMethod.id);
    });
  }

  toggleSelectedPaymentMethodId(id: PaymentsMethodsListDto['id']) {
    this.selectedPaymentMethodIdsSig.update((selected) => {
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);

      return selected;
    });
  }

  toggleSelectAllPaymentMethods() {
    if (this.isAllPaymentMethodsSelected())
      this.selectedPaymentMethodIdsSig.set(new Set());
    else
      this.selectedPaymentMethodIdsSig.set(
        new Set(this.paymenthsMethodsList().map(({ id }) => id)),
      );

    this.isAllPaymentMethodsSelected.update(
      (areAllSelected) => !areAllSelected,
    );
  }

  selectPaymentMethodListById(id: string) {
    const newPaymentMethodList = this.paymenthsMethodsList().map(
      (paymentMethod) => {
        if (paymentMethod.id == id) {
          return {
            ...paymentMethod,
            is_selected: !paymentMethod.is_selected,
          };
        }
        return paymentMethod;
      },
    );

    this.paymenthsMethodsList.set(newPaymentMethodList);
  }

  allSelectPaymentMethodList() {
    const newPaymentMethodList = this.paymenthsMethodsList().map(
      (paymentMethod) => {
        return {
          ...paymentMethod,
          is_selected: this.isAllPaymentMethodsSelected(),
        };
      },
    );
    this.paymenthsMethodsList.set(newPaymentMethodList);
  }

  cleanData() {
    this.isLoading.set(false);
    this.hasError.set(false);
    this.paymentsMethodsResponse.set(undefined);
  }
}
