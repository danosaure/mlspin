import Persistence, { MLSPinPersistenceError } from './index';
import objectStoreClear from './object-store--clear';
import { UploadedJsonFileType } from '../components/json-file-uploader-button';
import { Agent, Office, USPS, ZipLookup } from '../models';
import { PersistenceBaseType, PersistenceHistoryType } from '../models/types';

const STORE_NAMES = [Agent.STORE, Office.STORE, USPS.STORE, ZipLookup.STORE];

export class MLSPinPersistenceRestoreBackupError extends MLSPinPersistenceError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinPersistenceRestoreBackupError';
  }
}

const restorePut = async (
  objectStore: IDBObjectStore,
  entry: PersistenceBaseType,
  newHistory: PersistenceHistoryType
): Promise<void> => {
  const newItem = {
    ...entry,
    __history: [...(entry.__history || []), newHistory],
  };

  return new Promise((resolve, reject) => {
    const putRequest = objectStore.put(newItem);
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () =>
      reject(new MLSPinPersistenceRestoreBackupError(`Error restoring ${objectStore.name}/id:${newItem.id}`));
  });
};

export default async (persistence: Persistence, data: UploadedJsonFileType): Promise<void> => {
  const { json } = data;
  const { data: restoreData } = json;

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'restore',
    message: data.name,
  };

  await persistence.open();
  const transaction = await persistence.transaction(STORE_NAMES, 'readwrite');

  await Promise.all(
    STORE_NAMES.map(async (storeName: string): Promise<void> => {
      const storeData = restoreData.filter((storeData) => storeData.store === storeName);

      if (storeData.length) {
        const storeObject = transaction.stores[storeName];
        await objectStoreClear(storeObject);

        const { entries } = storeData[0];
        for (let i = 0; i < entries.length; i++) {
          await restorePut(storeObject, entries[i], newHistory);
        }
      }
    })
  );
};
