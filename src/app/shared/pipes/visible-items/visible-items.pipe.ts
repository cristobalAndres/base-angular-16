import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '@app/shared/enums';
import { AuthService } from '@app/shared/services';

interface VisibleItem {
  permissions?: Role[];
}

@Pipe({
  name: 'visibleItems',
  standalone: true,
})
export class VisibleItemsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  async transform<T extends VisibleItem>(items: T[]): Promise<T[]> {
    const visibleItems = await Promise.all(
      items.map(async (item) => {
        if (!item.permissions || item.permissions.length === 0) {
          return item;
        }
        const canAccess = await this.authService.hasRole(item.permissions);
        return canAccess ? item : null;
      }),
    );
    return visibleItems.filter((item) => item != null) as T[];
  }
}
