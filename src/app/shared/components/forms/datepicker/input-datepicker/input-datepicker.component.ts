import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDatepickerComponent } from '../button-datepicker';

@Component({
  selector: 'app-input-datepicker',
  standalone: true,
  imports: [ButtonDatepickerComponent, FormsModule],
  templateUrl: './input-datepicker.component.html',
})
export class InputDatepickerComponent {
  @Input() inputDate: string | undefined;
  @Output() validateInput = new EventEmitter<string>();

  //protected inputDate: string | undefined;
  protected onBlur(value: string) {
    // const inputValue = (event.target as HTMLInputElement).value;
    if (value !== undefined) {
      const parsed = this.parseDate(value);

      if (parsed) {
        this.inputDate = parsed;
        //this.validateInput.emit(parsed);
      } else {
        this.inputDate = '';
        //this.validateInput.emit('');
      }
    } else {
      this.inputDate = '';
      //this.validateInput.emit('');
    }
    // if (value !== undefined) {
    //   const parsed = this.parseDate(value);

    //   if (parsed) {
    //     //this.inputDate = parsed;
    //     this.validateInput.emit(parsed);
    //   } else {
    //     //this.inputDate = '';
    //     this.validateInput.emit('');
    //   }
    // } else {
    //   this.validateInput.emit('');
    // }
  }

  // Método para analizar una cadena de fecha en formato "yyyy-MM-dd"
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
        // La fecha es válida, devolverla en el formato deseado
        return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
      }
    }
    // La fecha no es válida, devuelve null
    return null;
  }

  // Método auxiliar para asegurarse de que los números tengan dos dígitos
  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
