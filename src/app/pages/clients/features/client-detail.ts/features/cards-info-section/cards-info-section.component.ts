import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { UserStatusType } from '@app/pages/clients/shared';
import { CardInfoDataDto } from '@app/pages/clients/shared/dtos/card-info-data.dto';
import {
  CardInfoComponent,
  CardPhotoInfoComponent,
} from '@app/pages/clients/ui';
import { BadgeColors } from '@app/shared/enums';
import { formatRut, getDate, getTime } from '@app/shared/helpers';
import { ClientsDataService } from '../../data-access/clients-data-service';

@Component({
  standalone: true,
  imports: [CommonModule, CardInfoComponent, CardPhotoInfoComponent],
  selector: 'app-cards-info-section',
  templateUrl: './cards-info-section.component.html',
  styleUrls: ['./cards-info-section.component.scss'],
})
export class CardsInfoSectionComponent {
  private clientDataService = inject(ClientsDataService);

  protected clienName = '';

  protected readonly client = this.clientDataService.client.asReadonly();
  protected readonly isClientLoading =
    this.clientDataService.isclientLoading.asReadonly();

  protected basicInfoCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Información Básica',
    data: [],
  };

  protected statusCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Estados',
    data: [],
  };

  constructor() {
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
        value: this.client().id ?? '',
      },
      {
        title: 'Rut',
        value: formatRut(this.client().rut),
      },
      {
        title: 'Email',
        value: this.client().email ?? '',
      },
      {
        title: 'Fecha de creación',
        value: `${getDate(this.client().created_at)} ${getTime(
          this.client().created_at,
        )}`,
      },
      {
        title: 'Teléfono',
        value: this.client().phone_number ?? '',
      },
    ];
  }

  private loadClientName() {
    if (!this.client().name) {
      this.clienName = '';
      return;
    }

    this.clienName = `${this.client().name ?? ''} ${
      this.client().last_name ?? ''
    }`;
  }

  //TODO: refactorizar
  /* eslint-disable sonarjs/cognitive-complexity*/
  private loadStatusCardData() {
    this.statusCardData.data = [
      {
        title: 'Cliente',
        value: !this.client().blocked ? 'Active' : 'Blocked',
        isBadge: true,
        color: !this.client().blocked
          ? BadgeColors.SUCCESS
          : BadgeColors.DANGER,
      },
      {
        title: 'Email',
        value: this.client().status ?? '',
        isBadge: true,
        color:
          this.client().status === UserStatusType.CONFIRMED
            ? BadgeColors.SUCCESS
            : BadgeColors.DANGER,
      },
      {
        title: 'Validación de identidad',
        value:
          this.client()?.dynamo && this.client().dynamo?.kyc_valid
            ? this.client()!.dynamo!.kyc_valid?.b_o_o_l
              ? 'success'
              : 'error'
            : 'No hay información disponible', //client.dynamo && client.dynamo.kyc_valid
        isBadge: true,
        color:
          this.client()?.dynamo && this.client().dynamo?.kyc_valid
            ? this.client()!.dynamo!.kyc_valid?.b_o_o_l
              ? BadgeColors.SUCCESS
              : BadgeColors.DANGER
            : BadgeColors.SECONDARY,
      },
      {
        title: 'Wallet',
        value:
          this.client() &&
          this.client().dynamo &&
          this.client().dynamo?.wallet_active
            ? this.client()!.dynamo!.wallet_active.b_o_o_l
              ? 'Active'
              : 'Blocked'
            : 'No hay información disponible',
        isBadge: true,
        color:
          this.client() &&
          this.client().dynamo &&
          this.client().dynamo!.wallet_active
            ? this.client().dynamo!.wallet_active.b_o_o_l
              ? BadgeColors.SUCCESS
              : BadgeColors.DANGER
            : BadgeColors.SECONDARY,
      },
    ];
  }
}
