import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-input-image',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormInputImageComponent implements OnDestroy {
  @Input({ required: true }) inputId!: string;
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label = 'Seleccionar imagen';
  @Input() previewUrlImage: string | undefined;

  @Output() fileChange = new EventEmitter<File | null>();

  private limitSizeInByte = 1000000; // 1MB

  URL = URL;

  previewImage: File | null = null;
  imageBannerUrl = signal<string | undefined>(undefined);

  onFileChange(event: Event) {
    const img = (event.target as HTMLInputElement).files?.item(0);
    if (!img) {
      this.previewImage = null;
      this.fileChange.emit(null);
      return;
    }

    if (img.size > this.limitSizeInByte) {
      this.control.setErrors({ maxFileSize: true });
      return;
    }
    this.previewImage = img;
    this.fileChange.emit(img);
  }

  ngOnDestroy(): void {
    this.previewImage = null;
    this.imageBannerUrl.set(undefined);
  }
}
