import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from '@app/shared/components/modals/confirm-modal';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalResponse } from './enums/confirm-moda-respnse.enum';
import { ConfirmModalData } from './interface/confirm-moda-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = true;
    config.keyboard = false;
  }

  open(data: ConfirmModalData) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    if (this.updateInstance(this.modalRef.componentInstance)) {
      this.modalRef.componentInstance.data = data;
      this.modalRef.componentInstance.primaryButtonAction.subscribe(() =>
        this.primaryButtonClicked(),
      );
      this.modalRef.componentInstance.secondaryButtonAction.subscribe(() =>
        this.secondaryButtonClicked(),
      );
    }

    return this.modalRef.result
      .then((value: ConfirmModalResponse) => value)
      .catch(() => ConfirmModalResponse.DISMISSED);
  }

  primaryButtonClicked() {
    this.modalRef.close(ConfirmModalResponse.PRIMARY_BUTTON_CLICKED);
  }

  secondaryButtonClicked() {
    this.modalRef.close(ConfirmModalResponse.SECONDARY_BUTTON_CLICKED);
  }

  private updateInstance(
    componentIntance: unknown,
  ): componentIntance is ConfirmModalComponent {
    return componentIntance instanceof ConfirmModalComponent;
  }
}
