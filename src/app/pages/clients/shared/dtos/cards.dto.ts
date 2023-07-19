export type CardsDto = Readonly<{
  added_at: string;
  bin: string;
  brand: string; // TODO: existira una interfaz?
  card_id: string;
  card_type: string; // TODO: existira una interfaz?
  deleted_at: string;
  enabled_card: boolean;
  enabled_wallet: boolean;
  id: number;
  is_favorite: boolean;
  is_inherited: boolean;
  mask: string;
  token: string;
  user_id: string;
}>;
