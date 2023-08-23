import { Injectable, computed, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ClientDto, Pagination } from '../../shared';
import { ClientsService } from '../clients-service';

@Injectable()
export class ClientsComponentService {
  private readonly clientsService = inject(ClientsService);
  private readonly isLoadingSig = signal(false);
  private readonly hasErrorSig = signal(false);
  private readonly currentPageSig = signal(1);
  private readonly clientsSig = signal<ClientDto[]>([]);
  private readonly searchSig = signal<string | undefined>(undefined);
  private readonly paginationSig = signal<Pagination>({
    current_page: 1,
    per_page: 0,
    total_items: 0,
    total_pages: 0,
  });

  readonly isLoading = computed(() => this.isLoadingSig());
  readonly currentPage = computed(() => this.currentPageSig());
  readonly clients = computed(() => this.clientsSig());
  readonly pagination = computed(() => this.paginationSig());
  readonly searchS = computed(() => this.searchSig());
  readonly hasError = computed(() => this.hasErrorSig());

  async loadClients() {
    this.hasErrorSig.set(false);
    this.isLoadingSig.set(true);

    try {
      const response = await lastValueFrom(
        this.clientsService.getClients({
          currentPage: this.currentPageSig(),
          search: this.searchSig(),
          perPage: 10,
        }),
      );

      this.clientsSig.set(response.data);
      this.paginationSig.set(response.pagination);
    } catch (error) {
      this.hasErrorSig.set(true);
    } finally {
      this.isLoadingSig.set(false);
    }
  }

  changeCurrentPage(currentPage: number) {
    this.currentPageSig.set(currentPage);
  }

  changeFilter(searchText: string) {
    this.searchSig.set(searchText);
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

    this.searchSig.set(undefined);
  }
}
