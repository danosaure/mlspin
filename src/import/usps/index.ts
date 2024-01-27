import { USPS, USPSType, ZipLookup, ZipLookupType } from '../../models';
import Persistence from '../../persistence';
import PersistenceHistoryType from '../../types/persistence-history';
import MLSPinImportError from '../error';
import parse from './parser';

export class MLSPinUSPSImportError extends MLSPinImportError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinUSPSImportError';
  }
}

export default async (content: string): Promise<void> => {
  const uspsEntries: Record<string, USPSType> = parse(content);

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'import',
  };

  let persistence: Persistence | undefined;

  return new Promise(async (resolve, reject) => {
    try {
      persistence = new Persistence();
      await persistence.open();

      const transaction = await persistence.transaction([USPS.STORE, ZipLookup.STORE], 'readwrite', {
        onabort: () => reject(new MLSPinUSPSImportError('Transaction aborted.')),
        oncomplete: () => resolve(),
      });

      // Fill the usps store with data.
      await persistence.putMany(transaction.stores[USPS.STORE], Object.values(uspsEntries), newHistory);

      // Update the ziplookup store.
      await new Promise<void>((resolve) => {
        if (persistence) {
          persistence.openCursor(
            transaction.stores[ZipLookup.STORE],
            (cursor) => {
              let needUpdate = false;
              const zipLookup = cursor.value as ZipLookupType;
              const uspsEntry = uspsEntries[zipLookup.id];

              if (zipLookup.city !== uspsEntry.name) {
                needUpdate = true;
                zipLookup.city = uspsEntry.name;
              }

              const set = new Set(zipLookup.neighborhoods.concat(uspsEntry.alternatives || []).concat([uspsEntry.name]));
              if (set.size !== zipLookup.neighborhoods.length) {
                needUpdate = true;
                zipLookup.neighborhoods = Array.from(set.values()).sort((a, b) =>
                  a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
                );
              }

              if (needUpdate) {
                zipLookup.__history = [...(zipLookup.__history || []), newHistory];
                cursor.update(zipLookup);
              }
              cursor.continue();
            },
            () => resolve()
          );
        }
      });

      transaction.complete();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown';
      reject(new MLSPinUSPSImportError(`Error importing USPS data: ${message}`));
    } finally {
      if (persistence) {
        persistence.close();
      }
    }
  });
};
