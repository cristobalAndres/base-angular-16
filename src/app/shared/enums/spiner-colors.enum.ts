export const SpinnerColor = {
  PRIMARY: 'text-primary',
  SECONDARY: 'text-secondary',
  SUCCESS: 'text-success',
  DANGER: 'text-danger',
  WARNING: 'text-warning',
  INFO: 'text-info',
  LIGHT: 'text-light',
  DARK: 'text-dark',
} as const;

export type SpinnerColor = (typeof SpinnerColor)[keyof typeof SpinnerColor];
