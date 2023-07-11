import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EcommerceDto, UserStatusType } from '@app/pages/clients/shared';
import { CardInfoDataDto } from '@app/pages/clients/shared/dtos/card-info-data.dto';
import { BadgeColors } from '@app/shared/enums';
import { formatRut, getDate, getTime } from '@app/shared/helpers';
import { Subscription } from 'rxjs';
import { ClientDetailServiceComponentService } from '../../data-access';
import { EcommerceListDto } from '../../shared/dtos/ecommerce-list.dto';

@Component({
  selector: 'app-client-detail.ts',
  templateUrl: './client-detail.ts.component.html',
  styleUrls: ['./client-detail.ts.component.scss'],
})
export class ClientDetailTsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private clientDetailService = inject(ClientDetailServiceComponentService);

  protected clientId = '';
  protected clienName = '';
  private routeParams$: Subscription | undefined;

  protected readonly client = this.clientDetailService.client.asReadonly();
  protected readonly isClientLoading =
    this.clientDetailService.isclientLoading.asReadonly();

  protected readonly ecommercesResponse =
    this.clientDetailService.ecommercesResponse.asReadonly();
  protected readonly isEcommercesLoading =
    this.clientDetailService.isEcommercesLoading.asReadonly();
  protected readonly ecommercesPerPage =
    this.clientDetailService.ecommercesPerPage;

  protected ecommerceList: EcommerceListDto[] = [];
  protected basicInfoCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Información Básica',
    data: [],
  };

  protected statusCardData: { title: string; data: CardInfoDataDto[] } = {
    title: 'Estados',
    data: [],
  };

  protected readonly isCardsLoading =
    this.clientDetailService.isCardsLoading.asReadonly();
  protected readonly cardsResponse =
    this.clientDetailService.cardsResponse.asReadonly();

  constructor() {
    effect(() => {
      this.loadBasicInfoCardData();
      this.loadStatusCardData();
      this.loadClientName();
    });

    effect(() => {
      this.loadEcommerceList();
    });
  }

  ngOnInit() {
    this.routeParams$ = this.route.params.subscribe((params) => {
      void this.check(params);
    });
  }

  async check(params: Params): Promise<void> {
    const { id } = params;
    this.clientId = id as string;

    await Promise.all([
      this.clientDetailService.loadClient(this.clientId),
      this.clientDetailService.loadCardsOfClient(this.clientId),
    ]);

    if (this.client()?.dynamo?.id?.s) {
      await this.clientDetailService.loadEcommerces(
        this.client()?.dynamo!.id?.s,
      );
    } else {
      this.clientDetailService.isEcommercesLoading.set(false);
    }
  }

  ngOnDestroy(): void {
    this.clientDetailService.cleanLocalData();
    this.routeParams$?.unsubscribe();
  }

  protected async onEcommerceCurrentPageChange(currentPage: number) {
    this.clientDetailService.ecommercesCurrentPage.set(currentPage);
    await this.clientDetailService.loadEcommerces(this.client()?.dynamo!.id?.s);
  }

  private loadEcommerceList() {
    this.ecommerceList =
      this.ecommercesResponse()?.ecommerces.map((ecommerce) => {
        return {
          id: ecommerce.id ?? '',
          channel: ecommerce.channel ?? '',
          email: ecommerce.email ?? '',
          timestamp: ecommerce.timestamp
            ? `${getDate(ecommerce.timestamp)} ${getTime(ecommerce.timestamp)}`
            : '',
          statusValue: this.getStatusAndColorOfEcommerce(ecommerce).status,
          statusColor: this.getStatusAndColorOfEcommerce(ecommerce).color,
        };
      }) ?? [];
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

  private getStatusAndColorOfEcommerce = (ecommerce: EcommerceDto) => {
    if (ecommerce.link_id && ecommerce.payment_method_enabled) {
      return { color: BadgeColors.SUCCESS, status: 'OK' };
    }

    if (ecommerce.link_id && !ecommerce.payment_method_enabled) {
      return { color: BadgeColors.DANGER, status: 'NOK' };
    }

    return { color: BadgeColors.SECONDARY, status: 'No vinculado' };
  };

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
