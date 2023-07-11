import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ClientDto, ClientParameter, Pagination } from '../../shared';
import { ClientsService } from '../clients-service';

@Injectable()
export class ClientsComponentService {
  private readonly clientsService = inject(ClientsService);
  readonly isLoading = signal(false);
  readonly currentPage = signal(1);

  readonly clients: WritableSignal<ClientDto[]> = signal([]);
  readonly pagination: WritableSignal<Pagination> = signal({
    current_page: 1,
    per_page: 0,
    total_items: 0,
    total_pages: 0,
  });

  readonly searchBy: WritableSignal<ClientParameter | undefined> =
    signal(undefined);
  readonly search: WritableSignal<string | undefined> = signal(undefined);

  async loadClients() {
    this.isLoading.set(true);

    try {
      const response = await lastValueFrom(
        this.clientsService.getClients({
          currentPage: this.currentPage(),
          searchParam: this.searchBy(),
          search: this.search(),
          perPage: 10,
        }),
      );

      this.clients.set(response.data);
      this.pagination.set(response.pagination);

      this.isLoading.set(false);
    } catch (error) {
      //TODO: Agregar error en vista y aquí

      this.isLoading.set(false);
    }
  }

  cleanLocalData() {
    this.isLoading.set(false);
    this.currentPage.set(1);

    this.clients.set([]);
    this.pagination.set({
      current_page: 1,
      per_page: 0,
      total_items: 0,
      total_pages: 0,
    });

    this.searchBy.set(undefined);
    this.search.set(undefined);
  }
}
