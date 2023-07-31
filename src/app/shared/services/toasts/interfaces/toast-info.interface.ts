import { ToastsColors } from '../enums';

export interface ToastInfo {
  body: string;
  delay: number;
  color: ToastsColors;
}
