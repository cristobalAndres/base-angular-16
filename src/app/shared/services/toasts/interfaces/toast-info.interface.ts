import { ToastsColors } from '../enums';

export type ToastInfo = Readonly<{
  body: string;
  delay: number;
  color: ToastsColors;
}>;
