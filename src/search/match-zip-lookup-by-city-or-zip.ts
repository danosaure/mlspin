import { ZipLookupType } from '../models/types';
import { getFragments, matchFragmentsToString, matchFragmentsToStringArray } from '../utils';

export const matchZipLookupByCityOrZip = (city: string, zip: string, zipLookup: ZipLookupType): boolean => {
  const matchCity = matchFragmentsToStringArray(zipLookup.neighborhoods, getFragments(city));
  const matchZip = matchFragmentsToString(zipLookup.id, getFragments(zip));

  if (city && zip) {
    return matchCity || matchZip;
  }

  if (city) {
    return matchCity;
  }

  if (zip) {
    return matchZip;
  }

  return true;
};
