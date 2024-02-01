import { ZipLookup } from '../models';
import { ZipLookupType } from '../models/types';
import { PersistenceTransaction } from '../persistence/transaction';
import { matchZipLookupByCityOrZip } from './match-zip-lookup-by-city-or-zip';

export const searchZipLookupByCityOrZip = async (
  city: string,
  zip: string,
  transaction: PersistenceTransaction
): Promise<Record<string, ZipLookupType>> =>
  new Promise<Record<string, ZipLookupType>>((resolve) => {
    const zips: Record<string, ZipLookupType> = {};

    const cursorReq = transaction.stores[ZipLookup.STORE].openCursor();
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;

      if (cursor) {
        const zipLookup = cursor.value as ZipLookupType;

        if (matchZipLookupByCityOrZip(city, zip, zipLookup)) {
          zips[zipLookup.id] = zipLookup;
        }

        cursor.continue();
      } else {
        resolve(zips);
      }
    };
  });
