import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionDto } from '@app/shared/components/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  private readonly router = inject(Router);

  public options: SelectionDto[] = [
    { value: 'reports/transaction', label: 'Transacciones' },
  ];

  async onReportSelected(report: string | undefined) {
    if (report) {
      await this.router.navigate([report]);
    }
  }
}
