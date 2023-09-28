import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerFiltersDto } from '@app/pages/clients/shared/dtos/banners-filter.dto';
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-banners-filter',
  standalone: true,
  templateUrl: './banners-filter.component.html',
  styleUrls: ['./banners-filter.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IconButtonComponent,
    NgbTooltip,
  ],
})
export class BannersFilterComponent implements AfterViewInit, OnDestroy {
  protected search = '';

  private inputEvent$!: Subscription;

  @Input({ required: true }) isLoading = false;

  @Output() searchEvent = new EventEmitter<BannerFiltersDto>();

  @ViewChild('search')
  input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.inputEvent$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        map((event) => event.target as HTMLInputElement),
        tap(({ value }) => this.searchEvent.emit({ search: value })),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.inputEvent$.unsubscribe();
  }

  filtersReset() {
    this.input.nativeElement.value = '';
    this.searchEvent.emit({ search: '' });
  }
}
