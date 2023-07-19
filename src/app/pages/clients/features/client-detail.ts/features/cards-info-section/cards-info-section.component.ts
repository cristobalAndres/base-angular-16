import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { UserStatusType } from '@app/pages/clients/shared';
import { CardInfoDataDto } from '@app/pages/clients/shared/dtos/card-info-data.dto';
import {
  CardInfoComponent,
  CardPhotoInfoComponent,
} from '@app/pages/clients/ui';
import { BadgeColors } from '@app/shared/enums';
import { formatRut } from '@app/shared/helpers';
import { ClientsDataService } from '../../data-access/clients-data-service';

@Component({
  standalone: true,
  imports: [CommonModule, CardInfoComponent, CardPhotoInfoComponent],
  selector: 'app-cards-info-section',
  templateUrl: './cards-info-section.component.html',
  styleUrls: ['./cards-info-section.component.scss'],
})
export class CardsInfoSectionComponent {
  private readonly datePipe = inject(DatePipe);
  private clientDataService = inject(ClientsDataService);

  protected readonly clientSig = this.clientDataService.client;
  protected readonly isClientLoadingSig = this.clientDataService.isLoading;

  protected clientName = '';

  protected basicInfoCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Información Básica',
    data: [],
  };

  protected statusCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Estados',
    data: [],
  };

  constructor() {
    // only change if ClientSig change
    effect(() => {
      this.loadBasicInfoCardData();
      this.loadStatusCardData();
      this.loadClientName();
    });
  }

  signoutClick() {
    //TODO: implementar
  }

  private loadBasicInfoCardData() {
    this.basicInfoCardData.data = [
      {
        title: 'Id',
        value: this.clientSig().id ?? '',
      },
      {
        title: 'Rut',
        value: formatRut(this.clientSig().rut),
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
        value:
          this.clientSig()?.dynamo && this.clientSig().dynamo?.kyc_valid
            ? this.clientSig()!.dynamo!.kyc_valid?.b_o_o_l
              ? 'success'
              : 'error'
            : '-', //client.dynamo && client.dynamo.kyc_valid
        isBadge: true,
        color:
          this.clientSig()?.dynamo && this.clientSig().dynamo?.kyc_valid
            ? this.clientSig()!.dynamo!.kyc_valid?.b_o_o_l
              ? BadgeColors.SUCCESS
              : BadgeColors.DANGER
            : BadgeColors.SECONDARY,
      },
      {
        title: 'Wallet',
        value:
          this.clientSig() &&
          this.clientSig().dynamo &&
          this.clientSig().dynamo?.wallet_active
            ? this.clientSig()!.dynamo!.wallet_active.b_o_o_l
              ? 'Active'
              : 'Blocked'
            : '-',
        isBadge: true,
        color:
          this.clientSig() &&
          this.clientSig().dynamo &&
          this.clientSig().dynamo!.wallet_active
            ? this.clientSig().dynamo!.wallet_active.b_o_o_l
              ? BadgeColors.SUCCESS
              : BadgeColors.DANGER
            : BadgeColors.SECONDARY,
      },
    ];
  }
}
