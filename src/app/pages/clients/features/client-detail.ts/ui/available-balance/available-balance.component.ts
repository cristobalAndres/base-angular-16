import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  AccountDetailDTO,
  AccountDetailModalDataDto,
  AccountDetailsResponseDto,
} from '@app/pages/clients/shared';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { ErrorRetryComponent } from '@app/shared/components/errors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDetailModalComponent } from '../account-detail-modal';

@Component({
  selector: 'app-available-balance',
  standalone: true,
  imports: [
    CommonModule,
    DefaultBadgeComponent,
    AccountDetailModalComponent,
    IconButtonComponent,
    ErrorRetryComponent,
  ],
  templateUrl: './available-balance.component.html',
  styleUrls: ['./available-balance.component.scss'],
})
export class AvailableBalanceComponent {
  private readonly modalService = inject(NgbModal);

  @Input() accountDetail?: AccountDetailsResponseDto;
  @Input() isLoading = true;

  @Output() retryShowAvailableBalance = new EventEmitter<void>();
  @Output() updateAccountBalance = new EventEmitter<void>();

  showAccountDetail() {
    const modalRef = this.modalService.open(AccountDetailModalComponent, {
      size: 'lg',
      centered: true,
    });

    if (modalRef.componentInstance instanceof AccountDetailModalComponent) {
      modalRef.componentInstance.activateModal = modalRef;
      modalRef.componentInstance.accountData =
        this.accountDetail?.accounts
          .map((account) => this.mapDataFromAccountDetail(account))
          .at(0) ?? [];
    }
  }

  protected outputOnRetryButtonClick() {
    this.retryShowAvailableBalance.emit();
  }

  protected onUpdateAccountBalance() {
    this.updateAccountBalance.emit();
  }

  private mapDataFromAccountDetail(
    accountDetail: AccountDetailDTO,
  ): AccountDetailModalDataDto[] {
    return [
      {
        title: 'account',
        value: accountDetail.account,
      },
      {
        title: 'accountLabel',
        value: accountDetail.accountLabel,
      },
      {
        title: 'accountType',
        value: accountDetail.accountType,
      },
      {
        title: 'availableBalance',
        value: accountDetail.availableBalance.toString(),
      },
      {
        title: 'blockedBalance',
        value: accountDetail.blockedBalance.toString(),
      },
      {
        title: 'currency',
        value: accountDetail.currency,
      },
      {
        title: 'enabledAccount',
        value: accountDetail.enabledAccount.toString(),
      },
      {
        title: 'forwardAvailableBalance',
        value: accountDetail.forwardAvailableBalance.toString(),
      },
      {
        title: 'holdBalance',
        value: accountDetail.holdBalance.toString(),
      },
      {
        title: 'lockedBalance',
        value: accountDetail.lockedBalance.toString(),
      },
      {
        title: 'paymentId',
        value: accountDetail.paymentId,
      },
      {
        title: 'paymentMethod',
        value: accountDetail.paymentMethod,
      },
      {
        title: 'totalBalance',
        value: accountDetail.totalBalance.toString(),
      },
    ];
  }
}
