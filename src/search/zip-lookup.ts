import ZipLookup, { ZipLookupType } from '../models/zip-lookup';
import Persistence from '../persistence';

export type ZipLookupSearchType = {
  id?: string;
  city?: string;
};

const matchZipLookup = (criteria: ZipLookupSearchType, zipLookup: ZipLookupType): boolean => {
  if (criteria.id) {
    if (zipLookup.id.toLocaleLowerCase().indexOf(criteria.id.toLocaleLowerCase()) === -1) {
      return false;
    }
  }

  if (criteria.city) {
    return zipLookup.neighborhoods.reduce((alreadyFound, neighborhood) => {
      if (alreadyFound) {
        return true;
      }

      return neighborhood.toLocaleLowerCase().indexOf(criteria.city?.toLocaleLowerCase() as string) !== -1;
    }, false);
  }

  return true;
};

export default async (criteria: ZipLookupSearchType): Promise<ZipLookupType[]> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction([ZipLookup.STORE], 'readonly');

  // Agents
  const matches = await new Promise<ZipLookupType[]>((resolve) => {
    const zips: ZipLookupType[] = [];

    persistence.openCursor(
      transaction.stores[ZipLookup.STORE],
      (cursor) => {
        const aZip: ZipLookupType = cursor.value;

        if (matchZipLookup(criteria, aZip)) {
          zips.push(aZip);
        }

        cursor.continue();
      },
      () => resolve(zips)
    );
  });

  transaction.complete();
  return matches.sort((a, b) => a.id.localeCompare(b.id));
};
