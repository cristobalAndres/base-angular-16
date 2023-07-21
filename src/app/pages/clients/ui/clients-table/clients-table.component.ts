import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { ActionsModalComponent } from '@app/shared/components/modals/actions-modal';
import { RutPipe } from '@app/shared/pipes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDataKYCModalFormComponent } from '../../features/update-data-kyc-modal-form';
import { ClientListDto } from '../../shared/dtos';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconButtonComponent,
    ActionsModalComponent,
    UpdateDataKYCModalFormComponent,
    RutPipe,
  ],
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent {
  @Input({ required: true }) clients!: ReadonlyArray<ClientListDto>;

  @Output() signoutButtonClick: EventEmitter<void> = new EventEmitter<void>();
  private modalService = inject(NgbModal);
  public title = '';
  public body: {
    bodyText: string;
  } = {
    bodyText: '',
  };
  public actions = {
    success: '',
    cancel: '',
  };

  addInfo(clientId: string) {
    this.title = 'Actualización datos KYC';
    this.body.bodyText = 'Por favor, ingrese los siguientes datos.';
    this.actions.success = 'Enviar';
    this.actions.cancel = 'Cerrar';

    const modalRef = this.modalService.open(UpdateDataKYCModalFormComponent, {
      centered: true,
    });

    if (modalRef.componentInstance instanceof UpdateDataKYCModalFormComponent) {
      modalRef.componentInstance.title = this.title;
      modalRef.componentInstance.clientId = clientId;
    }
  }

  // TODO: este modal espera desarrollo de funcionalida
  // signOff(content: any, rut: string | undefined) {
  //   this.signoutButtonClick.emit();
  //   this.title = 'Cerrar sesión del cliente';
  //   this.body.bodyText =
  //     'Al cerrar la sesión de este cliente, él será forzado a cerrar su sesión en el sistema para todos sus dispositivos. Tendrá que iniciar sesión de nuevo para poder usar la plataforma. ¿Estás seguro de cerrar la sesión de este cliente?';
  //   this.actions.success = 'Confirmar';
  //   this.actions.cancel = 'Cerrar';
  //   this.showModal(content);
  // }

  // TODO:este modal espera desarrollo de funcionalida
  // showModal(content: any) {
  //   const closeResult = '';
  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {},
  //       (reason) => {},
  //     );
  // }
}
