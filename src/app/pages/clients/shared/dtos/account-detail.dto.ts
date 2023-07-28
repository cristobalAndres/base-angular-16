export type AccountDetailDTO = Readonly<{
  account: string;
  accountLabel: string;
  accountType: string;
  availableBalance: number;
  blockedBalance: number;
  currency: string;
  enabledAccount: boolean;
  forwardAvailableBalance: number;
  holdBalance: number;
  lockedBalance: number;
  paymentId: string;
  paymentMethod: string;
  totalBalance: number;
}>;
