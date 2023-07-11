import { BadgeColors } from '@app/shared/enums';

export type EcommerceListDto = Readonly<{
  id: string;
  channel?: string;
  email?: string;
  timestamp?: string;
  statusValue: string;
  statusColor: BadgeColors;
}>;
