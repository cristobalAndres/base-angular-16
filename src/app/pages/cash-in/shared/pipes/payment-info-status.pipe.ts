import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentInfoStatus',
  standalone: true,
})
export class PaymentInfoStatusPipe implements PipeTransform {
  static readonly PAYMENT_INFO_STATUS = {
    'PRO-PRO': 'Transferido a cuenta de origen',
  } as const satisfies Record<string, string>;

  transform(value: unknown): string | undefined {
    if (!value) return;

    return (
      PaymentInfoStatusPipe.PAYMENT_INFO_STATUS[
        String(
          value,
        ).toUpperCase() as keyof typeof PaymentInfoStatusPipe.PAYMENT_INFO_STATUS
      ] ?? 'Error en la transferencia a la cuenta de origen'
    );
  }
}
