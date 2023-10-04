export type PromotionFormControlsDto = Partial<{
  main_text: string | null;
  terms_and_conditions: string | null;
  action_button_title: string | null;
}>;

export interface PromotionFormData {
  values: PromotionFormControlsDto;
  isValid: boolean;
}
