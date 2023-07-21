import { Component, Input } from '@angular/core';
import { BadgeColors } from '@app/shared/enums';
import { MetricDto } from '@app/shared/services/services-monitor/dtos';
import { MetricsName } from '../../enums';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.scss'],
})
export class MonitorItemComponent {
  @Input({ required: true }) metric!: MetricDto;
  @Input({ required: true }) isActive!: boolean;

  getValueText(value: number) {
    if (value < 10) return `${value}`;
    return '9+';
  }

  getColorByValue(value: number) {
    if (value === 0) return BadgeColors.SUCCESS;
    if (value > 0 && value <= 3) return BadgeColors.WARNING;
    return BadgeColors.DANGER;
  }

  getToolTipContent(metricName: string) {
    switch (metricName) {
      case MetricsName.ERROR_PTS_PURCHASE_AUTHORIZE:
        return 'PTS pagos';
      case MetricsName.ERROR_PTS_CARD:
        return 'PTS tarjerta';
      case MetricsName.ERROR_PTS_USER_VALIDATE:
        return 'Validación usuarios';
      default:
        return 'No encontrado';
    }
  }
}
