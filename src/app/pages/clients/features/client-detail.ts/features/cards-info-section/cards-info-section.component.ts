import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientsService } from '@app/pages/clients/data-access';
import {
  AccountDetailsResponseDto,
  UserStatusType,
} from '@app/pages/clients/shared';
import { CardInfoDataDto } from '@app/pages/clients/shared/dtos/card-info-data.dto';
import {
  CardInfoComponent,
  CardPhotoInfoComponent,
} from '@app/pages/clients/ui';
import { BadgeColors } from '@app/shared/enums';
import { RutPipe } from '@app/shared/pipes';
import { ConfirmModalService } from '@app/shared/services/modals/confirm-modal/confirm-modal.service';
import { ConfirmModalResponse } from '@app/shared/services/modals/confirm-modal/enums/confirm-moda-respnse.enum';
import { Subscription, lastValueFrom } from 'rxjs';
import { ClientsDataService } from '../../data-access/clients-data-service';
import { AvailableBalanceComponent } from '../../ui/available-balance';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardInfoComponent,
    CardPhotoInfoComponent,
    AvailableBalanceComponent,
  ],
  selector: 'app-cards-info-section',
  templateUrl: './cards-info-section.component.html',
  styleUrls: ['./cards-info-section.component.scss'],
  providers: [ClientsService],
})
export class CardsInfoSectionComponent implements OnInit, OnDestroy {
  private readonly datePipe = inject(DatePipe);
  private readonly rutPipe = inject(RutPipe);
  private route = inject(ActivatedRoute);

  private readonly confirmModalService = inject(ConfirmModalService);
  private clientsServce = inject(ClientsService);
  private clientDataService = inject(ClientsDataService);

  private routeParamsSub: Subscription | undefined;

  protected readonly clientSig = this.clientDataService.client;
  protected readonly isClientLoadingSig = this.clientDataService.isLoading;

  protected readonly isClientLoadingChangeStatus =
    this.clientDataService.isLoadingChangeStatus;

  protected clientName = '';
  private id = '';
  protected hasAccount = false;
  protected loadingAccountDetails = true;

  protected basicInfoCardData: { title: string; data: CardInfoDataDto[] } = {
    title: this.clientName,
    data: [],
  };

  protected statusCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Estados',
    data: [],
  };

  protected accountDetail: AccountDetailsResponseDto = {
    idEcommerce: '',
    idWallet: '',
    timestamp: '',
    accounts: [],
  };

  constructor() {
    // only change if ClientSig change
    effect(() => {
      this.loadClientName();
      this.loadBasicInfoCardData();
      this.loadStatusCardData();
      void this.getAccountDetails();
    });
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe((params: Params) => {
      const { id } = params;
      this.id = id as string;
    });
  }

  ngOnDestroy() {
    this.routeParamsSub?.unsubscribe();
  }

  signoutClick() {
    //TODO: implementar
  }

  async onBlockUnblockClient() {
    const eventType = !this.clientSig().blocked ? 'Bloquear' : 'Desbloquear';

    const response = await this.confirmModalService.open({
      title: `${eventType} cliente`,
      message: `¿Está seguro que desea cambiar el estado del cliente?`,
      primaryButtonText: 'Aceptar',
      secondaryButtonText: 'Cancelar',
    });

    if (response === ConfirmModalResponse.PRIMARY_BUTTON_CLICKED) {
      this.clientDataService.changeStatusClient();
    }
  }

  private loadBasicInfoCardData() {
    this.basicInfoCardData.title = this.clientName;
    this.basicInfoCardData.data = [
      {
        title: 'Id',
        value: this.clientSig().id ?? '',
      },
      {
        title: 'Rut',
        value: this.rutPipe.transform(this.clientSig().rut),
      },
      {
        title: 'Email',
        value: this.clientSig().email ?? '',
      },
      {
        title: 'Fecha de creación',
        value:
          this.datePipe.transform(this.clientSig().created_at, 'medium') ?? '',
      },
      {
        title: 'Teléfono',
        value: this.clientSig().phone_number ?? '',
      },
    ];
  }

  private loadClientName() {
    if (!this.clientSig().name) {
      this.clientName = '';
      return;
    }

    this.clientName = `${this.clientSig().name ?? ''} ${
      this.clientSig().last_name ?? ''
    }`;
  }

  //TODO: refactorizar
  /* eslint-disable sonarjs/cognitive-complexity*/
  private loadStatusCardData() {
    this.statusCardData.data = [
      {
        title: 'Cliente',
        value: !this.clientSig().blocked ? 'Active' : 'Blocked',
        isBadge: true,
        color: !this.clientSig().blocked
          ? BadgeColors.SUCCESS
          : BadgeColors.DANGER,
      },
      {
        title: 'Email',
        value: this.clientSig().status ?? '',
        isBadge: true,
        color:
          this.clientSig().status === UserStatusType.CONFIRMED
            ? BadgeColors.SUCCESS
            : BadgeColors.DANGER,
      },
      {
        title: 'Validación de identidad',
        value: this.clientSig().dynamo?.kyc_valid
          ? this.clientSig().dynamo.kyc_valid
            ? 'success'
            : 'error'
          : '-',
        isBadge: true,
        color: this.clientSig().dynamo?.kyc_valid
          ? this.clientSig().dynamo.kyc_valid
            ? BadgeColors.SUCCESS
            : BadgeColors.DANGER
          : BadgeColors.SECONDARY,
      },
      {
        title: 'Wallet',
        value: this.clientSig().dynamo?.wallet_active
          ? this.clientSig().dynamo.wallet_active
            ? 'Active'
            : 'Blocked'
          : '-',
        isBadge: true,
        color: this.clientSig().dynamo?.wallet_active
          ? this.clientSig().dynamo.wallet_active
            ? BadgeColors.SUCCESS
            : BadgeColors.DANGER
          : BadgeColors.SECONDARY,
      },
    ];
  }

  protected async getAccountDetails() {
    if (this.id) {
      try {
        this.loadingAccountDetails = true;
        this.accountDetail = await lastValueFrom(
          this.clientsServce.getAccountDetails(this.id),
        );
        this.loadingAccountDetails = false;
        this.hasAccount = true;
      } catch (err) {
        this.hasAccount = false;
        this.loadingAccountDetails = false;
      }
    }
  }
}
