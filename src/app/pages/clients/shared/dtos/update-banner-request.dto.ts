import { ActionType, PromotionType } from '../enums';

export type UpdateBannerRequestDto = Readonly<
  {
    id_promotion: string;
    action_type: ActionType;
    type_promotion: PromotionType;
    from_date: string;
    to_date: string;
    active: boolean;
    filter_attributes: Iterable<string>;
    country: string;
    title_text: string;
    badge_text: string;
    badge_background_color: string;
  } & Partial<{
    action_type_url: string;
    header_text: string;
    main_text: string;
    subtitle_text: string;
    terms_and_conditions: string;
    action_button_title: string;
    off_text: string;
    image_banner_url: string;
    image_tile_url: string;
    image_full_url: string;
  }>
>;
