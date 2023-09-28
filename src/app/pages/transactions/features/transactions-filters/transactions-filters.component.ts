import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import {
  InputNumberFilterComponent,
  InputTextFilterComponent,
  RangeDatepickerComponent,
  SelectComponent,
  SelectionDto,
} from '@app/shared/components/forms';
import {
  TransactionPayMethodPipe,
  TransactionStatusPipe,
} from '@app/shared/pipes';
import {
  TransactionPayMethod,
  TransactionStatus,
} from '@app/shared/services/transactions';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsFiltersService } from '../../data-access';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, SharedModule, IconButtonComponent, NgbTooltip],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

  @ViewChildren(InputTextFilterComponent)
  inputTextFilterComponent!: QueryList<InputTextFilterComponent>;

  @ViewChild(InputNumberFilterComponent)
  inputNumberFilterComponent!: InputNumberFilterComponent;

  @ViewChild(RangeDatepickerComponent)
  rangeDatePickerComponent!: RangeDatepickerComponent;

  @ViewChildren(SelectComponent)
  selectComponents!: QueryList<SelectComponent>;

  protected onStartDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      startDate: date,
    });
  }

  protected onEndDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      endDate: date,
    });
  }

  //#region CargaCombos
  //Metodos de Pago
  protected readonly payMethodOptions: SelectionDto<TransactionPayMethod>[] =
    Object.values(TransactionPayMethod).map((transactionPayMethod) => ({
      value: transactionPayMethod,
      label:
        TransactionPayMethodPipe.TRANSACTION_PAYMETHODS[transactionPayMethod],
    }));

  //Estados
  protected readonly statusOptions: SelectionDto<TransactionStatus>[] =
    Object.values(TransactionStatus).map((transactionStatus) => ({
      value: transactionStatus,
      label: TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus],
    }));
  //#endregion

  //#region Filtro
  //Estado
  protected onStatusChange(status: TransactionStatus | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      statusFilter: status,
    });
  }

  //Metodo de Pago
  protected onPayMethodChange(payMethod: TransactionPayMethod | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      payMethodFilter: payMethod,
    });
  }

  protected onNumberSearch(valueAndname: { value: number; name: string }) {
    if (valueAndname.name == 'posId') {
      this.transactionsFiltersService.updateTransactionsFilters({
        posId: valueAndname.value,
      });
    }
  }

  protected onTextSearch(valueAndname: { value: string; name: string }) {
    if (valueAndname.name == 'storeName') {
      this.transactionsFiltersService.updateTransactionsFilters({
        storeName: valueAndname.value, //this.receivedValue.value.toString(),
      });
      return;
    }
    if (valueAndname.name == 'userId') {
      this.transactionsFiltersService.updateTransactionsFilters({
        userId: valueAndname.value,
      });
      return;
    }
    if (valueAndname.name == 'clienteId') {
      this.transactionsFiltersService.updateTransactionsFilters({
        clienteId: valueAndname.value,
      });
    }
  }
  //#endregion

  protected filtersReset() {
    this.rangeDatePickerComponent.reset();
    this.selectComponents.toArray().forEach((selectComponent) => {
      selectComponent.reset();
    });
    this.inputTextFilterComponent.toArray().forEach((inputComponent) => {
      inputComponent.reset();
    });
    this.inputNumberFilterComponent.reset();
  }
}
