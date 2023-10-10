import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent, SelectionDto } from '../../select';

@Component({
  selector: 'app-range-datepicker-filter',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule, SelectComponent],
  templateUrl: './range-datepicker-filter.component.html',
  styleUrls: ['./range-datepicker-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatepickerFilterComponent {
  @ViewChild(SelectComponent)
  selectComponent!: SelectComponent;

  protected readonly dateRange: SelectionDto<string>[] = [
    { value: 'single', label: 'Por día' },
    { value: 'range', label: 'Rango de Fechas' },
  ];

  protected selectionType = 'single';

  private readonly calendar = inject(NgbCalendar);
  protected readonly formatter = inject(NgbDateParserFormatter);

  protected dateEdit: string | undefined;
  protected inputDateIni = this.formatter.format(this.calendar.getToday());
  protected inputDateFin: string | undefined;

  @Output() readonly startDateChange = new EventEmitter<Date | undefined>();
  @Output() readonly endDateChange = new EventEmitter<Date | undefined>();

  protected readonly hoveredDate = signal<NgbDate | null>(null);
  protected readonly endDate = signal<NgbDate | null>(this.calendar.getToday());
  protected readonly startDate = signal<NgbDate | null>(
    this.calendar.getToday(),
  );

  protected displayMonths = 1;

  protected colClass = 'col-6 col-md-6';
  protected selectClass = this.colClass;
  protected contentClass = this.colClass;
  protected datePickerClass = 'col-12';

  constructor() {
    // TODO: Simplify this emission
    effect(
      () => {
        const startDateFormat = this.formatter.format(this.startDate());
        const endDateFormat = this.formatter.format(this.endDate());

        const startDateT = new Date(startDateFormat).getTime();
        const startDateTZ = new Date(startDateFormat).getTimezoneOffset();
        const startDate = new Date(startDateT + startDateTZ * 60000);

        const endDateT = new Date(endDateFormat).getTime();
        const endDateTZ = new Date(endDateFormat).getTimezoneOffset();
        const endDate = new Date(endDateT + endDateTZ * 60000);

        this.startDateChange.emit(startDate ? startDate : undefined);
        this.endDateChange.emit(endDate ? endDate : undefined);
      },
      { allowSignalWrites: true },
    );
  }

  protected onDateSelection(date: NgbDate) {
    if (this.selectionType === 'single') {
      this.startDate.set(date);
      this.inputDateIni = this.formatter.format(date);

      this.endDate.set(date);
      this.inputDateFin = this.formatter.format(date);
    } else {
      if (this.dateEdit === 'startDate') {
        if (date.after(this.endDate())) {
          this.endDate.set(date);
        } else {
          this.startDate.set(date);
        }
      } else if (this.dateEdit === 'endDate') {
        if (date.before(this.startDate())) {
          this.startDate.set(date);
        } else {
          this.endDate.set(date);
        }
      }
    }
  }

  protected isHovered(date: NgbDate) {
    if (this.endDate()) return false;

    return date.after(this.startDate()) && date.before(this.hoveredDate());
  }

  protected isInnerRange(date: NgbDate) {
    return date.after(this.startDate()) && date.before(this.endDate());
  }

  protected isRange(date: NgbDate) {
    return (
      date.equals(this.startDate()) ||
      date.equals(this.endDate()) ||
      this.isInnerRange(date) ||
      this.isHovered(date)
    );
  }

  protected validateInput(input: string, pickerNumber: number) {
    const parsed = this.parseDate(input);

    switch (pickerNumber) {
      case 1:
        if (parsed) {
          this.inputDateIni = parsed;
          this.startDate.set(NgbDate.from(this.formatter.parse(parsed)));
          if (this.selectionType === 'single') {
            this.inputDateFin = parsed;
            this.endDate.set(NgbDate.from(this.formatter.parse(parsed)));
          }
        } else {
          this.inputDateIni = '';
        }
        break;
      case 2:
        if (parsed) {
          this.inputDateFin = parsed;
          this.endDate.set(NgbDate.from(this.formatter.parse(parsed)));
        } else {
          this.inputDateFin = '';
        }
        break;
    }
  }

  private parseDate(input: string): string | null {
    const parts = input.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      if (
        !isNaN(year) &&
        !isNaN(month) &&
        !isNaN(day) &&
        month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= 31
      ) {
        return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
      }
    }
    return null;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  protected buttonClick(dateEdit: string) {
    this.dateEdit = dateEdit;
  }

  protected calculateCalendar(): void {
    this.displayMonths = this.selectionType === 'single' ? 1 : 2;

    const iniDateStr =
      this.selectionType === 'single'
        ? this.inputDateFin || this.inputDateIni || ''
        : this.startDate()
        ? this.formatter.format(this.startDate())
        : this.inputDateIni || '';

    const iniDate = iniDateStr
      ? NgbDate.from(this.formatter.parse(iniDateStr))
      : this.calendar.getToday();

    this.startDate.set(
      this.selectionType === 'single'
        ? iniDate
        : iniDate
        ? this.calendar.getPrev(iniDate, 'm', 1)
        : this.calendar.getToday(),
    );

    if (this.selectionType !== 'single') {
      this.endDate.set(iniDate ? iniDate : this.calendar.getToday());
    }

    this.inputDateIni = this.formatter.format(this.startDate());
    this.inputDateFin =
      this.selectionType === 'single'
        ? this.formatter.format(this.startDate())
        : this.formatter.format(this.endDate());
  }

  protected calculateColClass() {
    this.selectClass =
      this.selectionType === 'single' ? this.colClass : 'col-4';

    this.contentClass =
      this.selectionType === 'single' ? this.colClass : 'col-8';

    this.datePickerClass =
      this.selectionType === 'single' ? 'col-12' : this.colClass;
  }

  protected onSelectionChange(range: string | undefined) {
    if (range !== undefined) {
      this.selectionType = range;

      this.calculateColClass();
      this.calculateCalendar();
    }
  }

  reset() {
    this.startDate.set(this.calendar.getPrev(this.calendar.getToday(), 'm', 1));
    this.endDate.set(this.calendar.getToday());
  }
}
