import { MetricsName } from '@app/core/sidebar/enums';

export type MetricDto = Readonly<{
  metric: MetricsName;
  timestamp: string;
  value: number;
}>;
