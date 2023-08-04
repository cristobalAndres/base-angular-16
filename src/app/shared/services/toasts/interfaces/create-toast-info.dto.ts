import { ToastInfo } from './toast-info.interface';

export type CreateToastInfoDto = Readonly<
  Pick<ToastInfo, 'body'> & Partial<Pick<ToastInfo, 'delay' | 'color'>>
>;
