import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-button',
  standalone: true,
  templateUrl: './button-datepicker.component.html',
})
export class ButtonDatepickerComponent {
  // @Input() inputDate: Input;
  @Output() toggleCalendar = new EventEmitter<void>();

  protected CalendarToggle() {
    this.toggleCalendar.emit();
  }
}
