import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut',
  standalone: true,
})
export class RutPipe implements PipeTransform {
  transform(rut: string | undefined): string {
    if (!rut) return '';
    const cleanedRut = this.cleanRut(rut);
    const cv = cleanedRut.slice(-1);
    const bodyRut = cleanedRut.slice(0, cleanedRut.length - 1);
    const rutInNumber = Number(bodyRut);
    if (!rutInNumber) return '';

    return Number(rutInNumber).toLocaleString('es-CL') + '-' + cv;
  }

  cleanRut = (rut: string) => {
    if (!rut) return '';
    return rut.replace(/-|\./g, '').toUpperCase();
  };
}
