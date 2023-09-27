import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormInputTextComponent implements OnInit {
  @Input({ required: true }) inputId!: string;
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() min: string | number | undefined;
  @Input() max: string | number | undefined;
  @Input() minlength: string | number | null = null;
  @Input() maxlength: string | number | null = null;

  errorMessages: Record<string, string> = {};

  ngOnInit(): void {
    this.errorMessages = {
      required: 'Este campo es requerido',
      email: 'El email no es válido',
      min: `El valor mínimo es ${this.min ?? 0}`,
      max: `El valor máximo es ${this.max ?? 0}`,
      minlength: `El mínimo de caracteres es ${this.minlength ?? 0}`,
      maxlength: `El máximo de caracteres es ${this.maxlength ?? 0}`,
    };
  }
}
