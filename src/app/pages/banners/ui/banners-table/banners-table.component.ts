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
  @Input({ required: true }) banners!: ReadonlyArray<BannerListDto>;

  @Output() editBannerEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.banners);
  }
  showBannerDetail() {
    // eslint-disable-next-line no-console
    console.log('showBannerDetail');
  }

  editBannerClick(id: string) {
    this.editBannerEvent.emit(id);
  }
}
