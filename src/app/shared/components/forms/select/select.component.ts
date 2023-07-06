import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SelectionDto } from './selection.dto';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `<form>
    <select
      class="form-select"
      #appSelect
      (change)="onOptionChange(appSelect.value)"
    >
      <option selected disabled *ngIf="withPlaceholder">
        {{ placeholder ?? 'Selecciona un valor' }}
      </option>
      <option *ngFor="let option of options" [value]="option.value">
        {{ option.label ?? option.value }}
      </option>
    </select>
  </form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<TSelectionValue extends string = string> {
  @Input() placeholder?: string;
  @Input() withPlaceholder?: boolean = true;

  @Input({ required: true }) options!: ReadonlyArray<
    SelectionDto<TSelectionValue>
  >;
  @Output() optionChange = new EventEmitter<TSelectionValue | undefined>();

  protected onOptionChange(value?: string) {
    this.optionChange.emit(value as TSelectionValue | undefined);
  }
}
