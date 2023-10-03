import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

export type CommonFormControlDto = Partial<{
  id_promotion: string | null;
  title_text: string | null;
  off_text: string | null;
  badge_text: string | null;
  badge_background_color: string | null;
  action_type: string | null;
  action_type_url: string | null;
  header_text: string | null;
  subtitle_text: string | null;
  active: boolean | null;
  from_date: string | null;
  to_date: string | null;
  country: string | null;
  commerces: ListItem[] | null | undefined;
}>;

export interface CommonFormData {
  values: CommonFormControlDto;
  isValid: boolean;
}
