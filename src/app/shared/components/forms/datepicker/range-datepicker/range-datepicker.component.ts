import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
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

@Component({
  selector: 'app-range-datepicker',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatepickerComponent {
  private readonly calendar = inject(NgbCalendar);
  protected readonly formatter = inject(NgbDateParserFormatter);

  @Output() readonly startDateChange = new EventEmitter<Date | undefined>();
  @Output() readonly endDateChange = new EventEmitter<Date | undefined>();

  protected readonly hoveredDate = signal<NgbDate | null>(null);
  protected readonly endDate = signal<NgbDate | null>(this.calendar.getToday());
  protected readonly startDate = signal<NgbDate | null>(
    this.calendar.getPrev(this.calendar.getToday(), 'm', 1),
  );

  constructor() {
    // TODO: Simplify this emission
    effect(
      () => {
        const startDate = this.formatter.format(this.startDate());
        const endDate = this.formatter.format(this.endDate());

        this.startDateChange.emit(startDate ? new Date(startDate) : undefined);
        this.endDateChange.emit(endDate ? new Date(endDate) : undefined);
      },
      { allowSignalWrites: true },
    );
  }

  protected onStartDateSelection(date: NgbDate) {
    if (!this.startDate()) {
      this.startDate.set(date);
      return;
    }
    this.startDate.set(date);
  }

  protected onEndDateSelection(date: NgbDate) {
    this.endDate.set(date);
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

  protected validateInput(
    currentValue: NgbDate | null,
    input: string,
  ): NgbDate | null {
    const parsed = this.formatter.parse(input);

    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  reset() {
    this.startDate.set(this.calendar.getPrev(this.calendar.getToday(), 'm', 1));
    this.endDate.set(this.calendar.getToday());
  }
}
