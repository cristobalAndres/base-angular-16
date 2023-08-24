import { HttpParams } from '@angular/common/http';

export type NullableParamValue = string | number | boolean | undefined | null;

export function createHttpParams(
  queryParams: Readonly<Record<string, NullableParamValue>>,
) {
  return Object.entries(queryParams)
    .filter((entry): entry is [string, NonNullable<NullableParamValue>] => {
      const value = entry.at(1);

      return value !== undefined && value !== null && value !== '';
    })
    .reduce(
      (httpParams, [key, value]) => httpParams.set(key, value),
      new HttpParams(),
    );
}
