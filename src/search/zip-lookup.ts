import ZipLookup, { ZipLookupType } from '../models/zip-lookup';
import Persistence from '../persistence';
import { PersistenceTransaction } from '../persistence/transaction';

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

export default async (
  criteria: ZipLookupSearchType,
  persistence?: Persistence,
  transaction?: PersistenceTransaction
): Promise<ZipLookupType[]> => {
  let localeTransaction = false;

  if (!transaction) {
    if (!persistence) {
      persistence = new Persistence();
      await persistence.open();
    }
    transaction = await persistence.transaction(ZipLookup.STORE);
    localeTransaction = true;
  }

  // Agents
  const matches = await new Promise<ZipLookupType[]>((resolve) => {
    const zips: ZipLookupType[] = [];

    persistence?.openCursor(
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

  if (localeTransaction) {
    transaction.complete();
  }
  return matches.sort((a, b) => a.id.localeCompare(b.id));
};
