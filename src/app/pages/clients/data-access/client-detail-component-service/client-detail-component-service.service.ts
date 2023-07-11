import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CardsResponse, ClientDto, EcommerceResponseDto } from '../../shared';
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

  //Cards
  readonly isCardsLoading = signal(false);
  readonly hasCardsError = signal(false);
  readonly cardsResponse: WritableSignal<CardsResponse | undefined> =
    signal(undefined);

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

  async loadCardsOfClient(clientId: string) {
    this.isCardsLoading.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getCards(clientId),
      );
      this.cardsResponse.set(result);
      this.hasCardsError.set(false);
    } catch (error) {
      this.hasCardsError.set(true);
    } finally {
      this.isCardsLoading.set(false);
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

    this.isCardsLoading.set(false);
    this.hasCardsError.set(false);
    this.cardsResponse.set(undefined);
  }
}
