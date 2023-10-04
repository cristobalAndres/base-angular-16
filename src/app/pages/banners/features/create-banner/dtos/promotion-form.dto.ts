import { CreateBannerDto } from '@app/pages/clients/shared';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

export type PromotionFormDto = Readonly<
  CreateBannerDto & {
    commerces?: ListItem[];
  }
>;

export type PromotionFormSettingsDto = Readonly<{
  modal: {
    title: string;
    message: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  toast: {
    errorMessage: string;
    successMessage: string;
  };
}>;
