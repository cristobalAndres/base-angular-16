import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { getDate, getTime } from '@app/shared/helpers';
import { lastValueFrom } from 'rxjs';
import {
  CardsResponse,
  ClientDto,
  EcommerceResponseDto,
  PaymentsMethodsType,
} from '../../shared';
import { PaymentsMethodsListDto } from '../../shared/dtos/payments-methods-list.dto';
import { ClientsService } from '../clients-service';
import { EcommercesService } from '../ecommerces-service';

@Injectable()
export class ClientDetailServiceComponentService {
  //Ecommerces
  private readonly ecommercesService = inject(EcommercesService);
  readonly isEcommercesLoading = signal(true);
  readonly ecommercesCurrentPage = signal(1);
  readonly hasEcommercesError = signal(false);
  readonly ecommercesResponse: WritableSignal<
    EcommerceResponseDto | undefined
  > = signal(undefined);
  readonly ecommercesPerPage: number = 5;

  //Client
  private readonly clientsService = inject(ClientsService);
  readonly isclientLoading = signal(false);
  readonly clientCurrentPage = signal(1);
  readonly hasclientError = signal(false);
  readonly client: WritableSignal<ClientDto> = signal({});

  //PaymentsMethods
  readonly isPaymentsMethodsLoading = signal(false);
  readonly hasPaymentsMethodsError = signal(false);
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

  async loadClient(clientId: string) {
    this.isclientLoading.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getClientDetail(clientId),
      );

      this.client.set(result);
      this.hasclientError.set(false);
    } catch (error) {
      this.hasclientError.set(true);
    } finally {
      this.isclientLoading.set(false);
    }
  }

  async loadEcommerces(clientId: string) {
    this.isEcommercesLoading.set(true);
    try {
      const result = (await lastValueFrom(
        this.ecommercesService.getEcommerces(clientId, {
          currentPage: this.ecommercesCurrentPage(),
          perPage: this.ecommercesPerPage,
        }),
      )) as EcommerceResponseDto;

      this.ecommercesResponse.set(result);
      this.hasEcommercesError.set(false);
    } catch (error) {
      this.hasEcommercesError.set(true);
    } finally {
      this.isEcommercesLoading.set(false);
    }
  }

  async loadPaymentsMethodsOfClient(clientId: string) {
    this.isPaymentsMethodsLoading.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getCards(clientId),
      );
      this.paymentsMethodsResponse.set(result);
      this.loadPaymentsMethodsList();
      this.hasPaymentsMethodsError.set(false);
    } catch (error) {
      this.hasPaymentsMethodsError.set(true);
    } finally {
      this.isPaymentsMethodsLoading.set(false);
    }
  }

  cleanLocalData() {
    this.isclientLoading.set(false);
    this.clientCurrentPage.set(1);
    this.hasclientError.set(false);
    this.client.set({});

    this.isEcommercesLoading.set(true);
    this.ecommercesCurrentPage.set(1);
    this.hasEcommercesError.set(false);
    this.ecommercesResponse.set(undefined);

    this.isPaymentsMethodsLoading.set(false);
    this.hasPaymentsMethodsError.set(false);
    this.paymentsMethodsResponse.set(undefined);
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
}
