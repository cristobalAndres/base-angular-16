import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EcommerceResponseDto } from '@app/pages/clients/shared';
import { lastValueFrom } from 'rxjs';
import { ClientsDataService } from '../clients-data-service';
import { EcommercesService } from '../ecommerces-service';

@Injectable()
export class EcommercesDataService {
  private readonly ecommercesService = inject(EcommercesService);
  private readonly clientDataService = inject(ClientsDataService);

  private readonly clientSig = this.clientDataService.client;

  private isLoadingSig = signal(true);
  private currentPageSig = signal(1);
  private hasErrorSig = signal(false);
  private ecommercesServiceResponseSig: WritableSignal<EcommerceResponseDto> =
    signal({
      ecommerces: [],
      total_items: 0,
      current_page: 1,
      total_pages: 1,
    });

  perPage = 5;
  readonly isLoading = computed(() => this.isLoadingSig());
  readonly currentPage = computed(() => this.currentPageSig());
  readonly hasError = computed(() => this.hasErrorSig());
  readonly ecommercesServiceResponse = computed(() =>
    this.ecommercesServiceResponseSig(),
  );

  constructor() {
    toObservable(this.clientSig)
      .pipe(takeUntilDestroyed())
      .subscribe((client) => {
        if (client?.id) {
          if (client?.dynamo?.id?.s) {
            void this.loadEcommerces(client?.dynamo?.id?.s);
          } else {
            this.isLoadingSig.set(false);
          }
        }
      });
  }

  changePage(currentPage: number) {
    this.currentPageSig.set(currentPage);
    void this.loadEcommerces(this.clientSig()?.dynamo!.id?.s);
  }

  async loadEcommerces(clientId: string) {
    this.isLoadingSig.set(true);
    try {
      const result = (await lastValueFrom(
        this.ecommercesService.getEcommerces(clientId, {
          currentPage: this.currentPageSig(),
          perPage: this.perPage,
        }),
      )) as EcommerceResponseDto;

      this.ecommercesServiceResponseSig.set(result);
      this.hasErrorSig.set(false);
    } catch (error) {
      this.hasErrorSig.set(true);
    } finally {
      this.isLoadingSig.set(false);
    }
  }

  cleanData() {
    this.isLoadingSig.set(true);
    this.currentPageSig.set(1);
    this.hasErrorSig.set(false);
    this.ecommercesServiceResponseSig.set({
      ecommerces: [],
      total_items: 0,
      current_page: 1,
      total_pages: 1,
    });
  }
}
