import { Injectable, computed, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ClientDto, ClientParameter, Pagination } from '../../shared';
import { ClientsService } from '../clients-service';

@Injectable()
export class ClientsComponentService {
  private readonly clientsService = inject(ClientsService);
  private isLoadingSig = signal(false);
  private currentPageSig = signal(1);

  private clientsSig = signal<ClientDto[]>([]);
  private paginationSig = signal<Pagination>({
    current_page: 1,
    per_page: 0,
    total_items: 0,
    total_pages: 0,
  });

  private searchBySig = signal<ClientParameter | undefined>(undefined);
  private searchSig = signal<string | undefined>(undefined);

  readonly isLoading = computed(() => this.isLoadingSig());
  readonly currentPage = computed(() => this.currentPageSig());
  readonly clients = computed(() => this.clientsSig());
  readonly pagination = computed(() => this.paginationSig());
  readonly searchBy = computed(() => this.searchBySig());
  readonly searchS = computed(() => this.searchSig());

  async loadClients() {
    this.isLoadingSig.set(true);

    try {
      const response = await lastValueFrom(
        this.clientsService.getClients({
          currentPage: this.currentPageSig(),
          searchParam: this.searchBySig(),
          search: this.searchSig(),
          perPage: 10,
        }),
      );

      this.clientsSig.set(response.data);
      this.paginationSig.set(response.pagination);

      this.isLoadingSig.set(false);
    } catch (error) {
      //TODO: Agregar error en vista y aquí

      this.isLoadingSig.set(false);
    }
  }

  changeCurrentPage(currentPage: number) {
    this.currentPageSig.set(currentPage);
  }

  changeFilter(searchText: string, searchBy: ClientParameter) {
    this.searchSig.set(searchText);
    this.searchBySig.set(searchBy);
  }

  cleanLocalData() {
    this.isLoadingSig.set(false);
    this.currentPageSig.set(1);

    this.clientsSig.set([]);
    this.paginationSig.set({
      current_page: 1,
      per_page: 0,
      total_items: 0,
      total_pages: 0,
    });

    this.searchBySig.set(undefined);
    this.searchSig.set(undefined);
  }
}
