import { MetricDto } from './metric.dto';

export type MonitorResponseDto = Readonly<{
  metrics: ReadonlyArray<MetricDto>;
}>;
