import { Injectable, computed, inject, signal } from '@angular/core';
import { ClientsService } from '@app/pages/clients/data-access';
import { ClientDto } from '@app/pages/clients/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientsDataService {
  private readonly clientsService = inject(ClientsService);

  private isLoadingSig = signal(false);
  private hasErrorSig = signal(false);

  // TODO: Remove `as ClientDto` by avoiding imperative handling of the state
  private readonly clientSig = signal<ClientDto>({} as ClientDto);

  readonly client = computed(() => this.clientSig());
  readonly isLoading = computed(() => this.isLoadingSig());
  readonly hasError = computed(() => this.hasErrorSig());

  async loadClient(clientId: string) {
    this.hasErrorSig.set(false);
    this.isLoadingSig.set(true);
    try {
      const result = await lastValueFrom(
        this.clientsService.getClientDetail(clientId),
      );

      this.clientSig.set(result);
    } catch (error) {
      this.hasErrorSig.set(true);
    } finally {
      this.isLoadingSig.set(false);
    }
  }

  cleanData() {
    this.isLoadingSig.set(false);
    this.hasErrorSig.set(false);

    // TODO: Remove this assignation in order to avoid imperative handling of the state
    this.clientSig.set({} as ClientDto);
  }
}
