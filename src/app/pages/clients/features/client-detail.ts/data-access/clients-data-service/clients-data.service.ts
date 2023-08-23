import { Injectable, computed, inject, signal } from '@angular/core';
import { ClientsService } from '@app/pages/clients/data-access';
import { ClientDto } from '@app/pages/clients/shared';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import {
  Observable,
  catchError,
  finalize,
  first,
  lastValueFrom,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class ClientsDataService {
  private readonly clientsService = inject(ClientsService);
  private readonly toastService = inject(ToastService);

  private isLoadingSig = signal(false);
  private hasErrorSig = signal(false);

  // TODO: Remove `as ClientDto` by avoiding imperative handling of the state
  private readonly clientSig = signal<ClientDto>({} as ClientDto);

  readonly client = computed(() => this.clientSig());
  readonly isLoading = computed(() => this.isLoadingSig());
  readonly hasError = computed(() => this.hasErrorSig());

  private isLoadingChangeStatusSig = signal(false);

  readonly isLoadingChangeStatus = computed(() =>
    this.isLoadingChangeStatusSig(),
  );

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

  changeStatusClient() {
    const blockService$ = this.clientSig().blocked
      ? this.clientsService.unBlockClient(this.clientSig().id ?? '')
      : this.clientsService.blockClient(this.clientSig().id ?? '');

    return this.changeStatus(blockService$).subscribe();
  }

  private changeStatus(observer: Observable<ClientDto>) {
    this.isLoadingChangeStatusSig.set(true);
    this.toastService.show({
      body: 'Enviando solicitud...',
      color: ToastsColors.PRIMARY,
    });
    return observer.pipe(
      finalize(() => {
        this.isLoadingChangeStatusSig.set(false);
      }),
      first(),
      catchError((error: unknown) => {
        this.toastService.clear();
        this.toastService.show({
          body: 'No se ha podido actualizar la información',
          color: ToastsColors.DANGER,
        });

        return throwError(() => error);
      }),
      tap((client) => {
        this.toastService.clear();
        this.toastService.show({
          body: 'Se ha actualizado la información correctamente',
          color: ToastsColors.SUCCESS,
        });
        this.clientSig.set(client);
      }),
    );
  }

  cleanData() {
    this.isLoadingSig.set(false);
    this.hasErrorSig.set(false);

    // TODO: Remove this assignation in order to avoid imperative handling of the state
    this.clientSig.set({} as ClientDto);
  }
}
