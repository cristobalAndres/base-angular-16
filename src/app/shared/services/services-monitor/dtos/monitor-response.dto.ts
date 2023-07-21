import { MetricDto } from './metric.dto';

export type MonitorResponseDto = Readonly<{
  metrics: MetricDto[];
}>;
