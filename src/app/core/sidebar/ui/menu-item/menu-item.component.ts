import { Component, Input } from '@angular/core';
import { MenuItemDto } from '../../dtos';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input({ required: true }) menu!: MenuItemDto;
  @Input({ required: true }) isActive!: boolean;
}
