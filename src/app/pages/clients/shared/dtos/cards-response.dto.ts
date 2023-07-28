import { AccountDto, CardsDto } from './';

export type CardsResponse = Readonly<{
  accounts: AccountDto[];
  cards: CardsDto[];
  current_page: number;
  per_page: number;
  total_items: number;
}>;
