import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ClientsService } from '@app/pages/clients/data-access';
import { ClientDto } from '@app/pages/clients/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientsDataService {
  private readonly clientsService = inject(ClientsService);
  readonly isclientLoading = signal(false);
  readonly clientCurrentPage = signal(1);
  readonly hasclientError = signal(false);
  readonly client: WritableSignal<ClientDto> = signal({});

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

  cleanData() {
    this.isclientLoading.set(false);
    this.clientCurrentPage.set(1);
    this.hasclientError.set(false);
    this.client.set({});
  }
}
