import ZipLookup, { ZipLookupType } from '../models/zip-lookup';
import Persistence from '../persistence';
import MLSPinPersistenceError from '../persistence/error';
import Office from '../models/office';
import Agent from '../models/agent';
import OfficeType from '../types/office';
import PersistenceHistoryType from '../types/persistence-history';

import parse from './office-results-parser';

const buildZipLookup = (offices: OfficeType[]): Record<string, ZipLookupType> =>
  offices.reduce((records: Record<string, ZipLookupType>, office) => {
    const record: ZipLookupType = records[office.zip] || { id: office.zip, neighborhoods: [] };
    if (record.neighborhoods.indexOf(office.city) === -1) {
      record.neighborhoods.push(office.city);
    }
    return {
      ...records,
      [office.zip]: record,
    };
  }, {});

const mergeWithCurrent = async (persistance: Persistence, objectStore: IDBObjectStore, zips: ZipLookupType[]): Promise<ZipLookupType[]> =>
  Promise.all(
    zips.map(async (zip): Promise<ZipLookupType> => {
      const oldItem = (await persistance.get(objectStore, zip.id)) as ZipLookupType;
      const neighborhoods = oldItem
        ? Array.from(new Set(oldItem.neighborhoods.concat(zip.neighborhoods)).values())
        : zip.neighborhoods;
      return {
        ...oldItem,
        ...zip,
        neighborhoods,
      };
    })
  );

export default async (content: string): Promise<void> => {
  const data = parse(content);

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'import',
  };

  let persistence: Persistence | undefined;

  return new Promise(async (resolve, reject) => {
    try {
      persistence = new Persistence();
      await persistence.open();

      const transaction = await persistence.transaction([Office.STORE, Agent.STORE, ZipLookup.STORE], 'readwrite', {
        onabort: () => reject(new MLSPinPersistenceError('Transaction aborted.')),
        oncomplete: () => resolve(),
      });

      // store `offices`
      await persistence.putMany(transaction.stores[Office.STORE], Object.values(data.offices), newHistory);

      // store `agents`
      await persistence.putMany(transaction.stores[Agent.STORE], Object.values(data.agents), newHistory);

      // store `zips`
      const zipLookups = buildZipLookup(Object.values(data.offices));
      const zipLookupsToPut = await mergeWithCurrent(persistence, transaction.stores[ZipLookup.STORE], Object.values(zipLookups));
      await persistence.putMany(transaction.stores[ZipLookup.STORE], zipLookupsToPut, newHistory);

      transaction.complete();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown';
      reject(new MLSPinPersistenceError(`Error importing: ${message}`));
    } finally {
      if (persistence) {
        persistence.close();
      }
    }
  });
};
