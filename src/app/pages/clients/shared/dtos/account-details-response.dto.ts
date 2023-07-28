import { AccountDetailDTO } from './account-detail.dto';

export type AccountDetailsResponseDto = Readonly<{
  idEcommerce?: string;
  idWallet?: string;
  timestamp?: string;
  accounts: AccountDetailDTO[];
}>;
