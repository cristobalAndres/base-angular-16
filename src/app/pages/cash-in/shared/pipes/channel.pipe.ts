import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'channel',
  standalone: true,
})
export class ChannelPipe implements PipeTransform {
  static readonly CHANNEL = {
    REFUND: 'Proceso automático',
    NOMINA: 'Proceso manual',
  } as const satisfies Record<string, string>;

  transform(value: unknown): string | undefined {
    if (!value) return;

    return (
      ChannelPipe.CHANNEL[
        String(value).toUpperCase() as keyof typeof ChannelPipe.CHANNEL
      ] ?? value
    );
  }
}
