import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { EcommerceResponseDto } from '@app/pages/clients/shared';
import { lastValueFrom } from 'rxjs';
import { EcommercesService } from '../ecommerces-service';

@Injectable()
export class EcommercesDataService {
  private readonly ecommercesService = inject(EcommercesService);
  readonly isLoading = signal(true);
  readonly perPage: number = 5;
  readonly currentPage = signal(1);
  readonly hasError = signal(false);
  readonly ecommercesServiceResponse: WritableSignal<
    EcommerceResponseDto | undefined
  > = signal(undefined);

  async loadEcommerces(clientId: string) {
    this.isLoading.set(true);
    try {
      const result = (await lastValueFrom(
        this.ecommercesService.getEcommerces(clientId, {
          currentPage: this.currentPage(),
          perPage: this.perPage,
        }),
      )) as EcommerceResponseDto;

      this.ecommercesServiceResponse.set(result);
      this.hasError.set(false);
    } catch (error) {
      this.hasError.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  cleanData() {
    this.isLoading.set(true);
    this.currentPage.set(1);
    this.hasError.set(false);
    this.ecommercesServiceResponse.set(undefined);
  }
}
