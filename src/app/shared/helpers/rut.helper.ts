const cleanRut = (rut: string) => {
  if (!rut) return '';

  return rut.replace(/-|\./g, '').toUpperCase();
};

export const formatRut = (rut: string | undefined): string => {
  if (!rut) return '';
  const cleanedRut = cleanRut(rut);
  const cv = cleanedRut.slice(-1);
  const bodyRut = cleanedRut.slice(0, cleanedRut.length - 1);
  const rutInNumber = Number(bodyRut);
  if (!rutInNumber) return '';

  return Number(rutInNumber).toLocaleString('es-CL') + '-' + cv;
};
