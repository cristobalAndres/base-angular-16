import { ClientParameter } from '../enums';

export type CLientsFilters = Readonly<{
  searchBy: ClientParameter | undefined;
  searchText: string;
}>;
