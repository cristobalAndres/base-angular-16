import { Role } from '@app/shared/enums';

export type MenuItemDto = Readonly<{
  name: string;
  link: string;
  icon: string;
  permissions?: Role[];
}>;
