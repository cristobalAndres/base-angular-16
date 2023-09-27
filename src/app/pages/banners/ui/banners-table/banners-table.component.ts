import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BannerListDto } from '@app/pages/clients/shared/dtos/banner-list.dto';
import { IconButtonComponent } from '@app/shared/components/buttons';

@Component({
  standalone: true,
  selector: 'app-banners-table',
  templateUrl: './banners-table.component.html',
  styleUrls: ['./banners-table.component.scss'],
  imports: [CommonModule, IconButtonComponent],
})
export class BannersTableComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) banners!: ReadonlyArray<BannerListDto>;

  @Output() editBannerEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteBannerEvent: EventEmitter<string> =
    new EventEmitter<string>();

  editBannerClick(id: string) {
    this.editBannerEvent.emit(id);
  }

  deleteBannerClick(id: string) {
    this.deleteBannerEvent.emit(id);
  }
}
