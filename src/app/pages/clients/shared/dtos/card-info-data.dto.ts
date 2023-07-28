import { BadgeColors } from '@app/shared/enums';

export type CardInfoDataDto = Readonly<{
  title: string;
  value: string;
  isBadge?: boolean;
  color?: BadgeColors;
}>;
